import os
import re
import json
import time
import hashlib
import threading
import subprocess
import mysql.connector
from flask import Flask, request, jsonify, session
from urllib.parse import urlparse
from collections import defaultdict
from dotenv import load_dotenv

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
        "content": "Digital identity systems are becoming increasingly common as a means of simplifying online access and transactions, but consumer trust varies widely. Surveys indicate that users’ confidence depends heavily on who provides the service and how securely personal information is managed. Building a trustworthy digital identity ecosystem requires transparency, robust security measures, and clear communication about data usage to gain broader adoption."
    },
    {
        "id": 6,
        "title": "New AI Regulations Aim to Protect User Data",
        "content": "Governments and regulatory bodies are introducing new legislation to ensure that AI systems respect user privacy and promote digital trust. These regulations focus on accountability, transparency, and ethical handling of personal information. Organizations deploying AI are being urged to conduct thorough risk assessments and implement safeguards to prevent misuse of sensitive data while maintaining user confidence."
    },
    {
        "id": 7,
        "title": "Cybersecurity Experts Warn About Rising Phishing Attacks",
        "content": "Cybersecurity professionals have reported a notable increase in sophisticated phishing attacks targeting personal and financial information. These attacks exploit users’ trust and often use advanced social engineering techniques to deceive victims. Experts recommend that individuals and organizations adopt multi-layered security measures, stay informed about common phishing tactics, and remain vigilant in protecting sensitive data."
    },
    {
        "id": 8,
        "title": "End-to-End Encryption Expands to More Apps",
        "content": "Messaging and collaboration applications are increasingly implementing end-to-end encryption to protect user communications. This security measure ensures that only the intended recipients can read messages, significantly enhancing digital safety and privacy. As threats to online communications grow, more companies are recognizing that strong encryption is essential to maintain user trust and safeguard sensitive information."
    },
    {
        "id": 9,
        "title": "Browsers Enhance Privacy With Tracking Prevention",
        "content": "Modern web browsers are rolling out features that block third-party tracking cookies and limit the ability of advertisers to collect personal data. These updates aim to give users more control over their online privacy and reduce intrusive tracking practices. Privacy advocates view these changes as a critical step in protecting individuals’ digital footprint and promoting greater transparency in the online advertising ecosystem."
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
# 8. MITMPROXY LOGIC (CLASS INCLUDED)
# ==========================================
# This class is intended to be run with `mitmdump -s this_file.py`
from collections import defaultdict
from urllib.parse import urlparse

# Keep track of usage


# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == '__main__':
    # Start background monitoring
    threading.Thread(target=check_status_loop, daemon=True).start()
    
    # Run Flask
    app.run(debug=True, host="0.0.0.0", port=5000)