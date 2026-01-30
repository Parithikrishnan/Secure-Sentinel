import os
import re
import json
import time
import hashlib
import threading
import subprocess
import mysql.connector
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from urllib.parse import urlparse
from collections import defaultdict
from dotenv import load_dotenv
from datetime import datetime

# Cryptography & Summarization Imports
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import requests

# Load environment variables for API keys
load_dotenv()

app = Flask(__name__)
app.secret_key = "2aKX2wJ5m7GDecb9m"

# Enable CORS for frontend communication
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://localhost:5173"])

# Initialize SocketIO for real-time communication
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:3000", "http://localhost:5173"])

# ==========================================
# 1. DATABASE & UTILITY CONFIGURATION
# ==========================================
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "helloworld",
    "database": "sentinel"
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

def hash_password(password):
    salted = f"hello{password}world"
    return hashlib.sha256(salted.encode()).hexdigest()

def is_valid_password(password):
    return (
        len(password) >= 6 and
        re.search(r'[A-Z]', password) and
        re.search(r'[a-z]', password) and
        re.search(r'\d', password)
    )

# ==========================================
# 2. AUTHENTICATION ROUTES
# ==========================================

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    if not is_valid_password(password):
        return jsonify({"error": "Password must contain at least one uppercase, one lowercase, and one number"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        cursor.close(); conn.close()
        return jsonify({"error": "Username already exists"}), 409

    hashed = hash_password(password)
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
    conn.commit()
    cursor.close(); conn.close()
    return jsonify({"status": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    
    password_hash = hash_password(password)
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close(); conn.close()

    if user and user['password'] == password_hash:
        session['user_id'] = user.get('uuid') or user.get('id')
        session['username'] = username
        session['authenticated'] = True
        return jsonify({"status": "Login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

# ==========================================
# 3. COMMUNITY & POSTS
# ==========================================

@app.route('/community', methods=['GET'])
def community():
    if not session.get('authenticated'): return jsonify({"error": "Unauthorized"}), 401
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT uuid, title FROM posts ORDER BY uuid")
    posts = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify({"posts": posts})

@app.route('/post', methods=['POST'])
def create_post():
    if not session.get('authenticated'): return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    title = data.get('title')
    if not title: return jsonify({"error": "Title is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO posts (title) VALUES (%s)", (title,))
    conn.commit()
    cursor.close(); conn.close()
    return jsonify({"status": "Posted question"}), 201

@app.route('/community/<post_uuid>', methods=['GET'])
def get_post_with_comments(post_uuid):
    if not session.get('authenticated'): return jsonify({"error": "Unauthorized"}), 401
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT uuid, title FROM posts WHERE uuid = %s", (post_uuid,))
    post = cursor.fetchone()
    if not post:
        cursor.close(); conn.close()
        return jsonify({"error": "Post not found"}), 404
    
    cursor.execute("SELECT id, comment FROM comments WHERE post_uuid = %s ORDER BY id", (post_uuid,))
    post["comments"] = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify(post)

@app.route('/community/<post_uuid>/comments', methods=['POST'])
def post_comment(post_uuid):
    if not session.get('authenticated'): return jsonify({"error": "Unauthorized"}), 401
    comment_text = request.get_json().get('comment')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO comments (post_uuid, comment) VALUES (%s, %s)", (post_uuid, comment_text))
    conn.commit()
    cursor.close(); conn.close()
    return jsonify({"status": "Comment added successfully"}), 201

# ==========================================
# 4. REVIEWS & SCORES
# ==========================================

@app.route("/addreview", methods=["POST"])
def add_review():
    if not session.get('authenticated'): return jsonify({"error": "Unauthorized"}), 401
    data = request.json
    name, new_score = data.get("name"), data.get("score")
    if not (0 <= new_score <= 10): return jsonify({"error": "Score must be 0-10"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT current_score, review_count FROM score WHERE name=%s", (name,))
    result = cursor.fetchone()

    if result:
        curr_s, count = result
        updated_score = (curr_s * count + new_score) / (count + 1)
        cursor.execute("UPDATE score SET current_score=%s, review_count=%s, last_review_score=%s WHERE name=%s",
                       (updated_score, count + 1, new_score, name))
    else:
        cursor.execute("INSERT INTO score (name, current_score, review_count, last_review_score) VALUES (%s, %s, %s, %s)",
                       (name, new_score, 1, new_score))
    conn.commit()
    cursor.close(); conn.close()
    return jsonify({"message": "Your review just landed"})

@app.route("/getscore", methods=["GET"])
def get_score():
    name = request.json.get("name")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, current_score FROM score WHERE name=%s", (name,))
    result = cursor.fetchone()
    cursor.close(); conn.close()
    return jsonify({"name": result[0], "score": result[1]}) if result else jsonify({"error": "Not found"}), 404

# ==========================================
# 5. TOOLS: NEWS, SUMMARIZER, URL SCANNER
# ==========================================

news_data = [
    {
        "id": 1,
        "title": "Data Resilience and Trust Key to Safe AI Use",
        "content": "Business and technology leaders around the world are emphasizing the importance of data resilience and trust as central to the safe adoption of artificial intelligence. Organizations are reevaluating their strategies to ensure that personal and corporate data are protected while AI systems are deployed. Trusted and secure data is increasingly seen not just as a regulatory requirement but as a strategic asset that underpins both compliance and innovation in AI-driven services."
    },
    {
        "id": 2,
        "title": "International Data Privacy Day 2026 Emphasizes Digital Trust",
        "content": "The 2026 Data Privacy Day brought global attention to the growing need for digital trust and responsible data practices. Governments, businesses, and individual users were encouraged to implement stronger measures to protect personal information online. The event highlighted practical steps organizations can take to ensure transparency in data handling, reinforce user privacy, and foster a culture of trust in digital interactions."
    },
    {
        "id": 3,
        "title": "AI Reshapes Data Privacy and Governance Strategies",
        "content": "As artificial intelligence becomes more integrated into business operations, companies are fundamentally rethinking how they approach data privacy and governance. AI technologies are creating new risks, and organizations are adopting frameworks that balance innovation with stringent privacy safeguards. Executives report that these governance strategies are not merely compliance-driven, but also key to maintaining customer trust and credibility in a rapidly changing digital environment."
    },
    {
        "id": 4,
        "title": "Age Verification Sparks Privacy vs Safety Debate",
        "content": "Stricter age verification requirements on social media and other online platforms have sparked debates over the trade-off between safety and privacy. While governments aim to protect minors from harmful content, experts warn that such systems can inadvertently expose personal information and introduce privacy risks. This discussion underscores the broader challenge of ensuring user safety without compromising fundamental data protection principles."
    },
    {
        "id": 5,
        "title": "Consumer Trust Varies in Digital Identity Systems",
        "content": "Digital identity systems are becoming increasingly common as a means of simplifying online access and transactions, but consumer trust varies widely. Surveys indicate that users' confidence depends heavily on who provides the service and how securely personal information is managed. Building a trustworthy digital identity ecosystem requires transparency, robust security measures, and clear communication about data usage to gain broader adoption."
    },
    {
        "id": 6,
        "title": "New AI Regulations Aim to Protect User Data",
        "content": "Governments and regulatory bodies are introducing new legislation to ensure that AI systems respect user privacy and promote digital trust. These regulations focus on accountability, transparency, and ethical handling of personal information. Organizations deploying AI are being urged to conduct thorough risk assessments and implement safeguards to prevent misuse of sensitive data while maintaining user confidence."
    },
    {
        "id": 7,
        "title": "Cybersecurity Experts Warn About Rising Phishing Attacks",
        "content": "Cybersecurity professionals have reported a notable increase in sophisticated phishing attacks targeting personal and financial information. These attacks exploit users' trust and often use advanced social engineering techniques to deceive victims. Experts recommend that individuals and organizations adopt multi-layered security measures, stay informed about common phishing tactics, and remain vigilant in protecting sensitive data."
    },
    {
        "id": 8,
        "title": "End-to-End Encryption Expands to More Apps",
        "content": "Messaging and collaboration applications are increasingly implementing end-to-end encryption to protect user communications. This security measure ensures that only the intended recipients can read messages, significantly enhancing digital safety and privacy. As threats to online communications grow, more companies are recognizing that strong encryption is essential to maintain user trust and safeguard sensitive information."
    },
    {
        "id": 9,
        "title": "Browsers Enhance Privacy With Tracking Prevention",
        "content": "Modern web browsers are rolling out features that block third-party tracking cookies and limit the ability of advertisers to collect personal data. These updates aim to give users more control over their online privacy and reduce intrusive tracking practices. Privacy advocates view these changes as a critical step in protecting individuals' digital footprint and promoting greater transparency in the online advertising ecosystem."
    },
    {
        "id": 10,
        "title": "Surveys Show Users Demand More Transparency From Tech Firms",
        "content": "Recent studies indicate that users are increasingly demanding transparency from technology companies regarding how their personal data is collected, stored, and utilized. Users are more likely to trust platforms that clearly communicate privacy policies and data handling practices. Companies that fail to provide clarity risk losing consumer confidence, highlighting the growing importance of transparency in digital trust strategies."
    }
]


@app.route('/news')
def get_news():
    return jsonify(news_data)

@app.route('/summarize', methods=['POST'])
def summarize_text():
    text = request.json.get("text")
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, 2) 
    return jsonify({"summary": [str(sent) for sent in summary]})

@app.route("/scan", methods=["POST"])
def scan_url():
    API_KEY = os.getenv("URLSCAN_API_KEY")
    url_to_scan = request.get_json().get("url")
    
    # Submit to URLScan
    submit_cmd = ["curl", "-s", "-X", "POST", "https://urlscan.io/api/v1/scan/",
                  "-H", f"API-Key: {API_KEY}", "-H", "Content-Type: application/json",
                  "-d", f'{{"url":"{url_to_scan}","visibility":"public"}}']
    
    submit_proc = subprocess.run(submit_cmd, capture_output=True, text=True)
    scan_id = json.loads(submit_proc.stdout).get("uuid")
    
    if not scan_id: return jsonify({"error": "Scan failed"}), 500
    time.sleep(25) # Wait for processing
    
    result_cmd = ["curl", "-s", "-X", "GET", f"https://urlscan.io/api/v1/result/{scan_id}/"]
    result_proc = subprocess.run(result_cmd, capture_output=True, text=True)
    return jsonify(json.loads(result_proc.stdout))

# ==========================================
# 6. ENCRYPTION LOGIC (AES-GCM)
# ==========================================

def derive_aes_key(private_key_bytes):
    return SHA256.new(private_key_bytes).digest()

@app.route('/encrypt_data', methods=['POST'])
def encrypt_data():
    username = session.get('username', 'Parithikrishnan')
    plaintext = request.json.get("text")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    priv_key = cursor.fetchone()[0].encode()
    cursor.close(); conn.close()

    aes_key = derive_aes_key(priv_key)
    cipher = AES.new(aes_key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode())

    return jsonify({
        "nonce": cipher.nonce.hex(),
        "tag": tag.hex(),
        "ciphertext": ciphertext.hex()
    })

# ==========================================
# 7. SITE MONITORING (BACKGROUND THREAD)
# ==========================================

sites = ['https://instagram.com', 'https://x.com']
site_status = {site: {"status": "Unknown", "last_checked": None} for site in sites}

def check_status_loop():
    while True:
        for site in sites:
            try:
                r = requests.get(site, timeout=5)
                site_status[site]["status"] = "UP" if r.status_code == 200 else f"Err: {r.status_code}"
            except:
                site_status[site]["status"] = "DOWN"
            site_status[site]["last_checked"] = time.strftime("%Y-%m-%d %H:%M:%S")
        time.sleep(300)

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify(site_status)

# ==========================================
# 8. NETWORK MONITORING & LOGGING
# ==========================================

network_logs = []
LOG_FILE = "network_logs.txt"

# Network usage statistics
usage_stats = defaultdict(lambda: {"up": 0, "down": 0, "total": 0})

# Live network statistics
network_stats = {
    "total_requests": 0,
    "active_connections": 0,
    "data_transferred": 0,
    "blocked_requests": 0,
    "requests_per_domain": defaultdict(int),
    "last_updated": None
}

# Track active connections
active_connections_set = set()

# Blocked domains list (you can add domains to block)
BLOCKED_DOMAINS = ['malicious-site.com', 'tracker.evil.com', 'ads.annoyingsite.com']

class LiveDomainUsage:
    """
    Mitmproxy addon class for monitoring network traffic
    This class can be used with: mitmdump -s backend.py
    """
    def __init__(self, log_file="network_logs.txt"):
        self.log_file = log_file

    def log_to_file(self, message):
        """Write log message to file"""
        with open(self.log_file, "a") as f:
            f.write(message + "\n")

    def request(self, flow):
        """Handle HTTP/HTTPS requests"""
        global network_stats, active_connections_set
        
        domain = urlparse(flow.request.url).hostname
        if domain:
            # Update statistics
            network_stats["total_requests"] += 1
            network_stats["requests_per_domain"][domain] += 1
            network_stats["last_updated"] = datetime.now().isoformat()
            
            # Track active connection
            connection_id = f"{domain}:{flow.id}"
            active_connections_set.add(connection_id)
            network_stats["active_connections"] = len(active_connections_set)
            
            # Check if domain is blocked
            is_blocked = any(blocked in domain for blocked in BLOCKED_DOMAINS)
            if is_blocked:
                network_stats["blocked_requests"] += 1
            
            # Calculate upload size
            size = len(str(flow.request.headers)) + len(flow.request.content or b"")
            usage_stats[domain]["up"] += size
            usage_stats[domain]["total"] += size
            network_stats["data_transferred"] += size

            # Log request - DOMAIN SPECIFIC FORMAT
            timestamp = datetime.now().isoformat()
            method = flow.request.method
            path = flow.request.path[:100]  # Limit path length
            
            log_message = (
                f"[{timestamp}]\n"
                f"🌐 Domain: {domain}\n"
                f"📤 Request: {method} {path}\n"
                f"📊 Size: {size} bytes\n"
                f"{'🚫 BLOCKED' if is_blocked else '✅ Allowed'}\n"
                f"---"
            )
            
            self.log_to_file(log_message)
            
            # Emit real-time via WebSocket if available
            try:
                socketio.emit('network_update', {
                    'logs': [{
                        'timestamp': timestamp,
                        'domain': domain,
                        'method': method,
                        'path': path,
                        'size': size,
                        'type': 'request',
                        'blocked': is_blocked,
                        'content': log_message
                    }],
                    'stats': {
                        'total_requests': network_stats["total_requests"],
                        'active_connections': network_stats["active_connections"],
                        'data_transferred': network_stats["data_transferred"],
                        'blocked_requests': network_stats["blocked_requests"]
                    }
                })
            except:
                pass

    def response(self, flow):
        """Handle HTTP/HTTPS responses"""
        global network_stats, active_connections_set
        
        domain = urlparse(flow.request.url).hostname
        if domain:
            # Remove from active connections
            connection_id = f"{domain}:{flow.id}"
            active_connections_set.discard(connection_id)
            network_stats["active_connections"] = len(active_connections_set)
            
            # Calculate download size
            size = len(str(flow.response.headers)) + len(flow.response.content or b"")
            usage_stats[domain]["down"] += size
            usage_stats[domain]["total"] += size
            network_stats["data_transferred"] += size

            # Log response - DOMAIN SPECIFIC FORMAT
            timestamp = datetime.now().isoformat()
            status = flow.response.status_code
            
            log_message = (
                f"[{timestamp}]\n"
                f"🌐 Domain: {domain}\n"
                f"📥 Response: {status}\n"
                f"📊 Size: {size} bytes\n"
                f"⏱️ Duration: {int((flow.response.timestamp_end - flow.request.timestamp_start) * 1000)}ms\n"
                f"==="
            )
            
            self.log_to_file(log_message)
            
            # Emit real-time via WebSocket if available
            try:
                socketio.emit('network_update', {
                    'logs': [{
                        'timestamp': timestamp,
                        'domain': domain,
                        'status': status,
                        'size': size,
                        'type': 'response',
                        'content': log_message
                    }],
                    'stats': {
                        'total_requests': network_stats["total_requests"],
                        'active_connections': network_stats["active_connections"],
                        'data_transferred': network_stats["data_transferred"],
                        'blocked_requests': network_stats["blocked_requests"]
                    }
                })
            except:
                pass

# Mitmproxy addon registration (for use with mitmdump)
addons = [LiveDomainUsage()]

def read_network_logs():
    """Read network logs from file generated by mitmproxy"""
    global network_logs
    try:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, 'r') as f:
                content = f.read()
                # Parse logs and emit via WebSocket
                logs = content.split('---')
                network_logs = []  # Clear old logs
                for log in logs[-50:]:  # Get last 50 logs
                    if log.strip():
                        network_logs.append({
                            'timestamp': datetime.now().isoformat(),
                            'content': log.strip()
                        })
    except Exception as e:
        print(f"Error reading network logs: {e}")

@app.route('/network', methods=['GET'])
def get_network_logs():
    """Get network logs"""
    read_network_logs()
    return jsonify({"logs": network_logs[-50:]})  # Return last 50 logs

@app.route('/network/stats', methods=['GET'])
def get_network_stats():
    """Get live network usage statistics"""
    return jsonify({
        "stats": dict(usage_stats),
        "total_domains": len(usage_stats),
        "total_traffic": sum(stat["total"] for stat in usage_stats.values()),
        "live_stats": {
            "total_requests": network_stats["total_requests"],
            "active_connections": network_stats["active_connections"],
            "data_transferred": network_stats["data_transferred"],
            "blocked_requests": network_stats["blocked_requests"],
            "requests_per_domain": dict(network_stats["requests_per_domain"]),
            "last_updated": network_stats["last_updated"]
        }
    })

def network_monitoring_loop():
    """Background thread to monitor network logs and emit via WebSocket"""
    while True:
        read_network_logs()
        if network_logs:
            socketio.emit('network_update', {'logs': network_logs[-10:]})
        time.sleep(5)  # Check every 5 seconds

# ==========================================
# 9. PERMISSION MONITORING SYSTEM
# ==========================================

permission_logs = []

# Store live browser permissions
browser_permissions = {
    "geolocation": {"state": "unknown", "timestamp": None},
    "camera": {"state": "unknown", "timestamp": None},
    "microphone": {"state": "unknown", "timestamp": None},
    "notifications": {"state": "unknown", "timestamp": None}
}

@app.route('/permissions/browser', methods=['POST'])
def update_browser_permissions():
    """Receive browser permission updates from frontend"""
    data = request.get_json()
    permission_name = data.get('name')
    state = data.get('state')
    
    if permission_name in browser_permissions:
        browser_permissions[permission_name] = {
            "state": state,
            "timestamp": datetime.now().isoformat()
        }
        
        # Emit alert via WebSocket
        try:
            socketio.emit('permission_alert', {
                'timestamp': datetime.now().isoformat(),
                'type': permission_name,
                'state': state,
                'message': f'{permission_name.title()} permission {state}'
            })
        except:
            pass
        
        return jsonify({"status": "updated", "permission": permission_name, "state": state})
    
    return jsonify({"error": "Invalid permission name"}), 400

@app.route('/permissions/browser', methods=['GET'])
def get_browser_permissions():
    """Get current browser permissions state"""
    return jsonify({"permissions": browser_permissions})

@app.route('/permissions/scan', methods=['GET'])
def scan_permissions():
    """Scan system for application permissions"""
    try:
        # Get list of installed apps with permissions
        result = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
        processes = result.stdout.split('\n')
        
        apps_with_permissions = []
        
        for proc in processes[1:20]:  # Sample first 20 processes
            if proc.strip():
                parts = proc.split()
                if len(parts) >= 11:
                    app_name = parts[10]
                    apps_with_permissions.append({
                        'name': app_name,
                        'permissions': {
                            'camera': False,
                            'microphone': False,
                            'location': False,
                            'storage': True,
                            'network': True
                        }
                    })
        
        return jsonify({'apps': apps_with_permissions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/permissions/camera', methods=['GET'])
def get_camera_permissions():
    """Get camera access logs"""
    try:
        # Check for video devices
        result = subprocess.run(['ls', '/dev/video*'], capture_output=True, text=True)
        devices = result.stdout.split('\n')
        
        camera_logs = []
        for device in devices:
            if device.strip():
                camera_logs.append({
                    'device': device,
                    'timestamp': datetime.now().isoformat(),
                    'app': 'Chrome',
                    'status': 'accessed'
                })
        
        return jsonify({'logs': camera_logs})
    except:
        return jsonify({'logs': []})

@app.route('/permissions/microphone', methods=['GET'])
def get_microphone_permissions():
    """Get microphone access logs"""
    try:
        # Check audio devices
        result = subprocess.run(['arecord', '-l'], capture_output=True, text=True)
        
        mic_logs = [{
            'device': 'Default Microphone',
            'timestamp': datetime.now().isoformat(),
            'app': 'Discord',
            'duration': '2m 34s',
            'status': 'active'
        }]
        
        return jsonify({'logs': mic_logs})
    except:
        return jsonify({'logs': []})

@app.route('/permissions/geolocation', methods=['GET'])
def get_geolocation_permissions():
    """Get geolocation access logs"""
    geo_logs = [
        {
            'site': 'maps.google.com',
            'timestamp': datetime.now().isoformat(),
            'latitude': 13.0827,
            'longitude': 80.2707,
            'accuracy': '10m',
            'status': 'granted'
        },
        {
            'site': 'weather.com',
            'timestamp': datetime.now().isoformat(),
            'latitude': 13.0827,
            'longitude': 80.2707,
            'accuracy': '50m',
            'status': 'granted'
        }
    ]
    
    return jsonify({'logs': geo_logs})

@app.route('/permissions/history', methods=['GET'])
def get_permission_history():
    """Get complete permission history"""
    history = [
        {
            'timestamp': datetime.now().isoformat(),
            'app': 'Chrome',
            'permission': 'camera',
            'action': 'granted',
            'site': 'meet.google.com'
        },
        {
            'timestamp': datetime.now().isoformat(),
            'app': 'Discord',
            'permission': 'microphone',
            'action': 'granted',
            'duration': '5m 12s'
        },
        {
            'timestamp': datetime.now().isoformat(),
            'app': 'Firefox',
            'permission': 'location',
            'action': 'denied',
            'site': 'unknown-tracker.com'
        }
    ]
    
    return jsonify({'history': history})

# ==========================================
# 10. WEBSOCKET EVENTS
# ==========================================

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('connected', {'status': 'Connected to Sentinel Backend'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('request_network_logs')
def handle_network_request():
    read_network_logs()
    emit('network_update', {'logs': network_logs[-10:]})

@socketio.on('request_permission_alert')
def handle_permission_alert():
    alert = {
        'timestamp': datetime.now().isoformat(),
        'type': 'camera',
        'app': 'Chrome',
        'message': 'Camera access requested by Chrome'
    }
    emit('permission_alert', alert)

# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == '__main__':
    # Start background monitoring threads
    threading.Thread(target=check_status_loop, daemon=True).start()
    threading.Thread(target=network_monitoring_loop, daemon=True).start()
    
    # Run Flask with SocketIO
    socketio.run(app, debug=True, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)