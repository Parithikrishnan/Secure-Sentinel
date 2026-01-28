from flask import Flask, request, jsonify, session
import mysql.connector

app = Flask(__name__)
app.secret_key = "2aKX2wJ5m7GDecb9m"

# --- MySQL connection ---
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="helloworld",
        database="sentinel"
    )

#--------------------------------------------------------------------

@app.route("/addreview", methods=["POST"])
def add_review():
    if not session.get('authenticated'):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    name = data.get("name")
    new_score = data.get("score")

    if not name or new_score is None:
        return jsonify({"error": "Name and score are required"}), 400

    # --- Check score is between 0 and 10 ---
    if not (0 <= new_score <= 10):
        return jsonify({"error": "Score must be between 0 and 10"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if item exists
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
        conn.commit()
    else:
        # If item doesn't exist, create it
        cursor.execute("""
            INSERT INTO score (name, current_score, review_count, last_review_score)
            VALUES (%s, %s, %s, %s)
        """, (name, new_score, 1, new_score))
        conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Your review just landed"})

#--------------------------------------------------------------------------

@app.route("/getscore", methods=["POST"])
def get_score():
    data = request.json
    name = data.get("name")  

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name, current_score FROM score WHERE name=%s", (name,))
    result = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({"name": result[0], "score": result[1]})

#--------------------------------------------------------------------------


# --- Run Flask ---
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
