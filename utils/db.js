// utils/db.js
import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',       // or your remote DB host
  user: 'root',   // e.g., 'root'
  password: 'admin',
  database: 'node_api_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});
