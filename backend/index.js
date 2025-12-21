require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

/* =========================
   DATABASE
========================= */

let pool = null;
if (process.env.DB_HOST) {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

/* =========================
   APP CONFIG
========================= */

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:9090';

const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

/* =========================
   DAILY REGISTER (POST)
========================= */

app.post('/api/daily-register', async (req, res) => {
  const { tareas, ejercicio, oracion, lectura, ingles } = req.body;

  // Validación básica
  if (!tareas || !ejercicio || !oracion || !lectura || !ingles) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Seguridad: DB no configurada
  if (!pool) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO daily_register
      (tareas, ejercicio, oracion, lectura, ingles)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [tareas, ejercicio, oracion, lectura, ingles]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error inserting daily_register:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

/* =========================
   ITEMS (LEGACY / DEMO)
========================= */

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'items.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let items = [];
try {
  if (fs.existsSync(dataFile)) {
    items = JSON.parse(fs.readFileSync(dataFile, 'utf8')) || [];
  } else {
    items = [
      { id: 1, name: 'Ejemplo 1', created_at: new Date().toISOString() },
      { id: 2, name: 'Ejemplo 2', created_at: new Date().toISOString() }
    ];
    fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  }
} catch (e) {
  console.error('Error loading items data:', e);
}

function persist() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  } catch (e) {
    console.error('Error persisting items:', e);
  }
}

app.get('/api/items', async (req, res) => {
  if (pool) {
    try {
      const r = await pool.query(
        'SELECT id, name, created_at FROM items ORDER BY id'
      );
      return res.json(r.rows);
    } catch (err) {
      console.error('DB query error (GET /api/items):', err);
      return res.status(500).json({ error: 'db error' });
    }
  } else {
    return res.json(items);
  }
});

app.post('/api/items', async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name required' });

  if (pool) {
    try {
      const r = await pool.query(
        'INSERT INTO items(name) VALUES($1) RETURNING id, name, created_at',
        [name]
      );
      return res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error('DB query error (POST /api/items):', err);
      return res.status(500).json({ error: 'db error' });
    }
  } else {
    const id = items.length
      ? Math.max(...items.map(i => i.id)) + 1
      : 1;

    const it = { id, name, created_at: new Date().toISOString() };
    items.push(it);
    persist();
    return res.status(201).json(it);
  }
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, async () => {
  if (pool) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to Postgres');
    } catch (err) {
      console.error('DB connection failed at startup', err.message || err);
    }
  }
  console.log(`Backend listening on ${PORT}`);
});
