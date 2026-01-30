import subprocess
import os
import json
import time
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("URLSCAN_API_KEY")

app = Flask(__name__)

@app.route("/scan", methods=["POST"])
def scan_url():
    data = request.get_json()

    if not data or "url" not in data:
        return jsonify({"error": "url is required"}), 400

    url_to_scan = data["url"]

    # 1️⃣ Submit URL
    submit_cmd = [
        "curl", "-s",
        "-X", "POST",
        "https://urlscan.io/api/v1/scan/",
        "-H", f"API-Key: {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", f'{{"url":"{url_to_scan}","visibility":"public"}}'
    ]

    submit_proc = subprocess.run(submit_cmd, capture_output=True, text=True)
    submit_json = json.loads(submit_proc.stdout)

    scan_id = submit_json.get("uuid")
    if not scan_id:
        return jsonify({"error": "UUID not returned"}), 500

    # 2️⃣ Wait a bit for scan to finish
    time.sleep(25)

    # 3️⃣ Fetch scan result using UUID
    result_cmd = [
        "curl", "-s",
        "-X", "GET",
        f"https://urlscan.io/api/v1/result/{scan_id}/",]

    result_proc = subprocess.run(result_cmd, capture_output=True, text=True)

    # 4️⃣ Return FINAL scan result (not submission response)
    return jsonify(json.loads(result_proc.stdout))


if __name__ == "__main__":
    app.run(debug=True)
