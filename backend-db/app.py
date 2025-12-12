from flask import Flask
import psycopg2

app = Flask(__name__)

def get_connection():
    return psycopg2.connect(
        host="postgres",
        database="appdb",
        user="admin",
        password="admin123"
    )

@app.route("/")
def home():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()
        cur.close()
        conn.close()
        return f"<h1>Conectado a Postgres!</h1><p>{version}</p>"
    except Exception as e:
        return f"<h1>Error conectando a DB</h1><p>{e}</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
