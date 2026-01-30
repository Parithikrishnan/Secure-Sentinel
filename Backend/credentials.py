import mysql.connector
import json
from Crypto.Cipher import AES
from Crypto.Hash import SHA256

# ==========================
# DATABASE CONFIG
# ==========================
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "helloworld",
    "database": "sentinel"
}

# ==========================
# Fetch private key (password field) from DB
# ==========================
def get_private_key():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = 'Parithikrishnan'")
    private_key = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return private_key.encode()  # convert string to bytes

# ==========================
# Derive AES key from private key
# ==========================
def derive_aes_key(private_key_bytes):
    return SHA256.new(private_key_bytes).digest()  # 32 bytes = AES-256

# ==========================
# Encrypt a string
# ==========================
def encrypt_string(plaintext, filename):
    private_key = get_private_key()
    aes_key = derive_aes_key(private_key)

    cipher = AES.new(aes_key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode())

    # Save encrypted data to file
    data = {
        "nonce": cipher.nonce.hex(),
        "tag": tag.hex(),
        "ciphertext": ciphertext.hex()
    }
    with open(filename, "w") as f:
        json.dump(data, f)

    print("✅ Encrypted and saved to file")

# ==========================
# Decrypt a string
# ==========================
def decrypt_string(filename):
    private_key = get_private_key()
    aes_key = derive_aes_key(private_key)

    with open(filename, "r") as f:
        data = json.load(f)

    cipher = AES.new(aes_key, AES.MODE_GCM, nonce=bytes.fromhex(data["nonce"]))
    decrypted = cipher.decrypt_and_verify(bytes.fromhex(data["ciphertext"]), bytes.fromhex(data["tag"]))

    print("🔓 Decrypted text:")
    print(decrypted.decode())

# ==========================
# Demo
# ==========================
if __name__ == "__main__":
    secret_text = "Helloworldasdfjas;lfkjasdf;lkjasdfkj;l"
    file_name = "imp_data/secret_data.enc"

    encrypt_string(secret_text, file_name)
    decrypt_string(file_name)
