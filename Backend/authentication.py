from flask import Flask, request, jsonify
import hashlib
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

@app.route('/login', methods=['POST'])
def login():
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
        return jsonify({
            "status": "Login successful"
        })
    else:
        return jsonify({"error": "Invalid password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
