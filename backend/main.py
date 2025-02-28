from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_FILE = "transactions.db"

# Create table if not exists
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS transactions 
                      (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, description TEXT, date TEXT, amount REAL)''')
    conn.commit()
    conn.close()

init_db()

@app.route("/transactions", methods=["GET"])
def get_transactions():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions ORDER BY date DESC")
    transactions = [{"id": row[0], "type": row[1], "description": row[2], "date": row[3], "amount": row[4]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(transactions)

@app.route("/add", methods=["POST"])
def add_transaction():
    data = request.json
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO transactions (type, description, date, amount) VALUES (?, ?, ?, ?)", 
                   (data["type"], data["description"], data["date"], data["amount"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Transaction added successfully"}), 201

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_transaction(id):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM transactions WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Transaction deleted successfully"})

if __name__ == "__main__":
    app.run(debug=True)
