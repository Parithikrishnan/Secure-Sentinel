from flask import Flask, jsonify
import requests
import threading
import time

app = Flask(__name__)

# List of sites to monitor
sites = ['https://instagram.com', 'https://x.com']

# Dictionary to store status
site_status = {site: {"status": "Unknown", "last_checked": None} for site in sites}

# Function to check a single site's status
def check_status(url):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            return "UP"
        else:
            return f"Returned status code {r.status_code}"
    except requests.exceptions.RequestException:
        return "DOWN or unreachable"

# Background function to update all sites every 5 minutes
def update_status():
    while True:
        for site in sites:
            site_status[site]["status"] = check_status(site)
            site_status[site]["last_checked"] = time.strftime("%Y-%m-%d %H:%M:%S")
        time.sleep(300)  # Wait 5 minutes

# Start the background thread
threading.Thread(target=update_status, daemon=True).start()

# Flask route to get current status
@app.route('/status', methods=['GET'])
def get_status():
    return jsonify(site_status)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
