from flask import Flask, request, jsonify
import hashlib
import re
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="helloworld",
        database="sentinel"
    )

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

@app.route('/register', methods=['POST'])
def register():
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

    return jsonify({"status": "User registered successfully"})

if __name__ == '__main__':
    app.run(debug=True)
