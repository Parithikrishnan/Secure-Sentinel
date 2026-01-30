# live_domain_usage.py
import os
from mitmproxy import http
from collections import defaultdict
from urllib.parse import urlparse

TARGET_DOMAINS = [
    "google.com",
]

usage = defaultdict(lambda: {
    "up": 0,
    "down": 0,
    "total": 0
})

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")

def get_size(headers, content):
    headers_size = sum(len(k) + len(v) for k, v in headers.items())
    body_size = len(content) if content else 0
    return headers_size + body_size

def is_target(domain):
    return domain and any(domain.endswith(d) for d in TARGET_DOMAINS)

class LiveDomainUsage:
    def request(self, flow: http.HTTPFlow):
        domain = urlparse(flow.request.url).hostname
        if is_target(domain):
            size = get_size(flow.request.headers, flow.request.content)
            usage[domain]["up"] += size
            usage[domain]["total"] += size
            self.print_stats()

    def response(self, flow: http.HTTPFlow):
        domain = urlparse(flow.request.url).hostname
        if is_target(domain) and flow.response:
            size = get_size(flow.response.headers, flow.response.content)
            usage[domain]["down"] += size
            usage[domain]["total"] += size
            self.print_stats()

    def print_stats(self):
        clear_screen()
        print("📡 LIVE DOMAIN DATA USAGE\n")
        for domain, data in usage.items():
            print(
                f"{domain}\n"
                f"  ↑ Upload   : {data['up'] / 1024:.2f} KB\n"
                f"  ↓ Download : {data['down'] / 1024:.2f} KB\n"
                f"  Σ Total    : {data['total'] / 1024:.2f} KB\n"
            )
        print("Press Ctrl+C to stop")

addons = [LiveDomainUsage()]
