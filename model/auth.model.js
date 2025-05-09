import { db } from '../utils/db.js';

// Create Users table if not exists
export const initAuthTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(225) NOT NULL,
      email VARCHAR(225) UNIQUE NOT NULL,
      password VARCHAR(225) NOT NULL
    )
  `;
  db.query(query, (err) => {
    if (err) {
      console.error('❌ Failed to create users table:', err.message);
    } else {
      console.log('✅ Users table is ready');
    }
  });
};

// Register a new user (no need to insert user_id)
export const registerUser = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], callback);
};

// Find user by email
export const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

// Find user by ID
export const findUserById = (user_id, callback) => {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  db.query(query, [user_id], callback);
};
