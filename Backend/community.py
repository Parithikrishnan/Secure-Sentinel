from flask import Flask, request, jsonify, session
import mysql.connector

app = Flask(__name__)
app.secret_key = "2aKX2wJ5m7GDecb9m"  # Required for sessions

# ----- Database connection -----
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="helloworld",
        database="sentinel"
    )


#---------------------------------------------------------
def get_all_posts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch only posts (UUID and title)
    cursor.execute("""
        SELECT uuid, title
        FROM posts
        ORDER BY uuid
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    # Format posts as a list of dictionaries
    posts_list = [{"uuid": row["uuid"], "title": row["title"]} for row in rows]
    return posts_list


@app.route('/community', methods=['GET'])
def community():
    if not session.get('authenticated'):
        return jsonify({"error": "Unauthorized"}), 401

    posts = get_all_posts()
    return jsonify({"posts": posts})

#---------------------------------------------------------

@app.route('/post', methods=['POST'])
def create_post():
    if not session.get('authenticated'):
       return jsonify({"error": "Unauthorized"}), 401
    
    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({"error": "Title is required"}), 400


    conn = get_db_connection()
    cursor = conn.cursor()

    # Insert into posts table
    cursor.execute( "INSERT INTO posts (title) VALUES (%s)",(title,)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "status": "Posted question"
    }), 201

#---------------------------------------------------------

@app.route('/community/<post_uuid>', methods=['GET'])
def get_post_with_comments(post_uuid):
    if not session.get('authenticated'):
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch the post
    cursor.execute("SELECT uuid, title FROM posts WHERE uuid = %s", (post_uuid,))
    post = cursor.fetchone()

    if not post:
        cursor.close()
        conn.close()
        return jsonify({"error": "Post not found"}), 404

    # Fetch all comments for the post
    cursor.execute("SELECT id, comment FROM comments WHERE post_uuid = %s ORDER BY id", (post_uuid,))
    comments = cursor.fetchall()

    cursor.close()
    conn.close()

    post["comments"] = comments  # Add comments list to post

    return jsonify(post)

#---------------------------------------------------------

@app.route('/community/<post_uuid>/comments', methods=['POST'])
def post_comment(post_uuid):
    if not session.get('authenticated'):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    comment_text = data.get('comment')
    if not comment_text:
        return jsonify({"error": "Comment text is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO comments (post_uuid, comment) VALUES (%s, %s)",
        (post_uuid, comment_text)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"status": "Comment added successfully"}), 201

#---------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)
