"""
Secure Sentinel - Unified Backend Server
Consolidates all backend operations into a single Flask application
Serves all operations on a single port (5000)
"""

from flask import Flask, request, jsonify, session
from flask_cors import CORS
import hashlib
import re
import mysql.connector
import threading
import time
import requests
import subprocess
import json
from dotenv import load_dotenv
import os
from datetime import datetime

# ============================
# Flask App Initialization
# ============================
app = Flask(__name__)
app.secret_key = "2aKX2wJ5m7GDecb9m"
CORS(app)

# Load environment variables
load_dotenv()
API_KEY = os.getenv("URLSCAN_API_KEY", "")

# ============================
# Database Configuration
# ============================
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "helloworld",
    "database": "sentinel"
}

def get_db_connection():
    """Create and return a database connection"""
    return mysql.connector.connect(**DB_CONFIG)

# ============================
# HELPER FUNCTIONS
# ============================

def hash_password(password):
    """Hash password with salt"""
    salted = f"hello{password}world"
    return hashlib.sha256(salted.encode()).hexdigest()

def is_valid_password(password):
    """Validate password requirements"""
    return (
        len(password) >= 6 and
        re.search(r'[A-Z]', password) and
        re.search(r'[a-z]', password) and
        re.search(r'\d', password)
    )

def is_authenticated():
    """Check if user is authenticated"""
    return session.get('authenticated', False)

# ============================
# AUTHENTICATION ROUTES
# ============================

@app.route('/api/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password required"}), 400

        password_hash = hash_password(password)

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if not user:
            return jsonify({"error": "User not found"}), 404

        if user['password'] == password_hash:
            session['user_id'] = user.get('uuid', username)
            session['username'] = username
            session['authenticated'] = True
            return jsonify({"status": "Login successful", "user_id": session['user_id']}), 200
        else:
            return jsonify({"error": "Invalid password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password required"}), 400

        if not is_valid_password(password):
            return jsonify({"error": "Password must contain at least one uppercase, one lowercase, and one number"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({"error": "Username already exists, please choose another"}), 409

        hashed = hash_password(password)
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            (username, hashed)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"status": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/logout', methods=['POST'])
def logout():
    """User logout endpoint"""
    session.clear()
    return jsonify({"status": "Logged out successfully"}), 200


# ============================
# COMMUNITY ROUTES
# ============================

def get_all_posts():
    """Fetch all posts from database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT uuid, title FROM posts ORDER BY uuid")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [{"uuid": row["uuid"], "title": row["title"]} for row in rows]
    except Exception as e:
        print(f"Error fetching posts: {e}")
        return []


@app.route('/api/community', methods=['GET'])
def community():
    """Get all community posts"""
    if not is_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    posts = get_all_posts()
    return jsonify({"posts": posts}), 200


@app.route('/api/post', methods=['POST'])
def create_post():
    """Create a new community post"""
    if not is_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return jsonify({"error": "Title and content are required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO posts (title, content, user_uuid) VALUES (%s, %s, %s)",
            (title, content, session.get('user_id'))
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"status": "Post created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================
# SCORING/REVIEW ROUTES
# ============================

@app.route("/api/addreview", methods=["POST"])
def add_review():
    """Add or update a review score"""
    if not is_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.json
        name = data.get("name")
        new_score = data.get("score")

        if not name or new_score is None:
            return jsonify({"error": "Name and score are required"}), 400

        if not (0 <= new_score <= 10):
            return jsonify({"error": "Score must be between 0 and 10"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT current_score, review_count FROM score WHERE name=%s", (name,))
        result = cursor.fetchone()

        if result:
            current_score, review_count = result
            updated_score = (current_score * review_count + new_score) / (review_count + 1)
            updated_review_count = review_count + 1

            cursor.execute("""
                UPDATE score
                SET current_score=%s, review_count=%s, last_review_score=%s
                WHERE name=%s
            """, (updated_score, updated_review_count, new_score, name))
        else:
            cursor.execute("""
                INSERT INTO score (name, current_score, review_count, last_review_score)
                VALUES (%s, %s, %s, %s)
            """, (name, new_score, 1, new_score))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"status": "Review added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/scores", methods=["GET"])
def get_scores():
    """Get all scores"""
    if not is_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM score ORDER BY current_score DESC")
        scores = cursor.fetchall()
        cursor.close()
        conn.close()

        return jsonify({"scores": scores}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================
# NEWS ROUTES
# ============================

news_data = [
    {
        "id": 1,
        "title": "Data Resilience and Trust Key to Safe AI Use",
        "content": "Business and technology leaders around the world are emphasizing the importance of data resilience and trust as central to the safe adoption of artificial intelligence."
    },
    {
        "id": 2,
        "title": "International Data Privacy Day 2026 Emphasizes Digital Trust",
        "content": "The 2026 Data Privacy Day brought global attention to the growing need for digital trust and responsible data practices."
    },
    {
        "id": 3,
        "title": "AI Reshapes Data Privacy and Governance Strategies",
        "content": "As artificial intelligence becomes more integrated into business operations, companies are fundamentally rethinking how they approach data privacy and governance."
    },
    {
        "id": 4,
        "title": "Age Verification Sparks Privacy vs Safety Debate",
        "content": "Stricter age verification requirements on social media and other online platforms have sparked debates over the trade-off between safety and privacy."
    },
    {
        "id": 5,
        "title": "Consumer Trust Varies in Digital Identity Systems",
        "content": "Digital identity systems are becoming increasingly common as a means of simplifying online access and transactions."
    },
]


@app.route('/api/news', methods=['GET'])
def get_news():
    """Get all news articles"""
    return jsonify({"news": news_data}), 200


@app.route('/api/news/<int:news_id>', methods=['GET'])
def get_news_detail(news_id):
    """Get a specific news article"""
    news = next((n for n in news_data if n['id'] == news_id), None)
    if news:
        return jsonify(news), 200
    return jsonify({"error": "News not found"}), 404


# ============================
# UPTIME MONITORING ROUTES
# ============================

# List of sites to monitor
sites = ['https://instagram.com', 'https://x.com']

# Dictionary to store status
site_status = {site: {"status": "Unknown", "last_checked": None} for site in sites}


def check_status(url):
    """Check if a site is up"""
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            return "UP"
        else:
            return f"Returned status code {r.status_code}"
    except requests.exceptions.RequestException:
        return "DOWN or unreachable"


def update_status_background():
    """Background function to update all sites every 5 minutes"""
    while True:
        for site in sites:
            site_status[site]["status"] = check_status(site)
            site_status[site]["last_checked"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        time.sleep(300)  # Wait 5 minutes


# Start the background thread for uptime monitoring
uptime_thread = threading.Thread(target=update_status_background, daemon=True)
uptime_thread.start()


@app.route('/api/status', methods=['GET'])
def get_status():
    """Get current status of monitored sites"""
    return jsonify(site_status), 200


@app.route('/api/status/<path:url>', methods=['GET'])
def check_single_status(url):
    """Check status of a specific URL"""
    status = check_status(url)
    return jsonify({"url": url, "status": status, "checked_at": datetime.now().isoformat()}), 200


# ============================
# SUSPICIOUS URL SCANNING ROUTES
# ============================

@app.route("/api/scan", methods=["POST"])
def scan_url():
    """Scan a URL for suspicious content using URLScan API"""
    if not is_authenticated():
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.get_json()

        if not data or "url" not in data:
            return jsonify({"error": "url is required"}), 400

        url_to_scan = data["url"]

        if not API_KEY:
            return jsonify({"error": "URLSCAN_API_KEY not configured"}), 500

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
            return jsonify({"error": "UUID not returned from scan service"}), 500

        # 2️⃣ Wait for scan to finish
        time.sleep(25)

        # 3️⃣ Fetch scan result using UUID
        result_cmd = [
            "curl", "-s",
            "-X", "GET",
            f"https://urlscan.io/api/v1/result/{scan_id}/",
        ]

        result_proc = subprocess.run(result_cmd, capture_output=True, text=True)
        result_json = json.loads(result_proc.stdout)

        return jsonify({
            "scan_id": scan_id,
            "url": url_to_scan,
            "result": result_json
        }), 200

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid response from scan service"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================
# HEALTH CHECK & INFO ROUTES
# ============================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "Server is running",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "authentication": "✓",
            "community": "✓",
            "scoring": "✓",
            "news": "✓",
            "uptime_monitoring": "✓",
            "suspicious_url_scan": "✓"
        }
    }), 200


@app.route('/api/info', methods=['GET'])
def server_info():
    """Server information endpoint"""
    return jsonify({
        "name": "Secure Sentinel Backend Server",
        "version": "1.0.0",
        "description": "Unified backend server for Secure Sentinel application",
        "endpoints": {
            "authentication": ["/api/login", "/api/register", "/api/logout"],
            "community": ["/api/community", "/api/post"],
            "scoring": ["/api/addreview", "/api/scores"],
            "news": ["/api/news", "/api/news/<id>"],
            "uptime": ["/api/status", "/api/status/<url>"],
            "security": ["/api/scan"],
            "health": ["/api/health", "/api/info"]
        }
    }), 200


# ============================
# ERROR HANDLERS
# ============================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({"error": "Internal server error"}), 500


@app.errorhandler(401)
def unauthorized(error):
    """Handle 401 errors"""
    return jsonify({"error": "Unauthorized"}), 401


# ============================
# MAIN
# ============================

if __name__ == '__main__':
    print("""
    ╔════════════════════════════════════════════════════════╗
    ║    Secure Sentinel - Unified Backend Server            ║
    ║                                                        ║
    ║    Starting server on http://localhost:5000           ║
    ║                                                        ║
    ║    Available Services:                                ║
    ║    ✓ Authentication (Login, Register, Logout)         ║
    ║    ✓ Community (Posts)                                ║
    ║    ✓ Scoring & Reviews                               ║
    ║    ✓ News Feed                                       ║
    ║    ✓ Uptime Monitoring                               ║
    ║    ✓ Suspicious URL Scanning                         ║
    ║                                                        ║
    ║    Check /api/info for complete endpoint list        ║
    ╚════════════════════════════════════════════════════════╝
    """)
    
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
