usage_stats = defaultdict(lambda: {"up": 0, "down": 0, "total": 0})

class LiveDomainUsage:
    def __init__(self, log_file="log.txt"):
        self.log_file = log_file

    def log_to_file(self, message):
        with open(self.log_file, "a") as f:
            f.write(message + "\n")

    def request(self, flow):
        domain = urlparse(flow.request.url).hostname
        if domain and "google.com" in domain:
            # Calculate upload size
            size = len(str(flow.request.headers)) + len(flow.request.content or b"")
            usage_stats[domain]["up"] += size
            usage_stats[domain]["total"] += size

            # Log request
            self.log_to_file(f"REQUEST to {flow.request.url}:\nHeaders: {flow.request.headers}\nBody: {flow.request.content}\n---")

    def response(self, flow):
        domain = urlparse(flow.request.url).hostname
        if domain and "google.com" in domain:
            # Calculate download size
            size = len(str(flow.response.headers)) + len(flow.response.content or b"")
            usage_stats[domain]["down"] += size
            usage_stats[domain]["total"] += size

            # Log response
            self.log_to_file(f"RESPONSE from {flow.request.url}:\nHeaders: {flow.response.headers}\nBody: {flow.response.content}\n===")
