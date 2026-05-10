require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'tp9kafka',
});

app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM kafka_messages ORDER BY received_at DESC LIMIT 20'
    );
    res.json({ total: result.rowCount, data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/messages/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM kafka_messages WHERE id = $1',
      [parseInt(req.params.id)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message introuvable' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('API demarree sur http://localhost:' + PORT);
  console.log('GET http://localhost:' + PORT + '/messages');
  console.log('GET http://localhost:' + PORT + '/messages/:id');
});