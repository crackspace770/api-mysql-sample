import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByEmail, findUserById } from '../model/auth.model.js';

const JWT_SECRET = 'your_secret_key'; // Replace this with env var in production

// User Registration
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    findUserByEmail(email, async (err, results) => {
      if (err) {
        console.error('Error finding user:', err); // Log the error for debugging
        return res.status(500).json({
          sukses: false,
          message: 'Database error',
          error: err
        });
      }
      if (results.length > 0) {
        return res.status(409).json({
          sukses: false,
          message: 'User with email already exists'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Register user
      registerUser(name, email, hashedPassword, (err, result) => {
        if (err) {
          console.error('Error registering user:', err); // Log the error for debugging
          return res.status(500).json({
            sukses: false,
            message: 'Failed to register user',
            error: err
          });
        }
        res.status(201).json({
          sukses: true,
          message: 'User registered successfully'
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error); // Log the error for debugging
    res.status(500).json({
      sukses: false,
      message: 'Server error',
      error
    });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    findUserByEmail(email, async (err, results) => {
      if (err) {
        console.error('Error finding user during login:', err); // Log the error for debugging
        return res.status(500).json({
          sukses: false,
          message: 'Database error',
          error: err
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          sukses: false,
          message: 'Invalid email or password'
        });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          sukses: false,
          message: 'Invalid email or password'
        });
      }

      const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '3d' });

      res.status(200).json({
        sukses: true,
        message: 'Login successful',
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          token
        }
      });
    });
  } catch (error) {
    console.error('Server error during login:', error); // Log the error for debugging
    res.status(500).json({
      sukses: false,
      message: 'Server error',
      error
    });
  }
};
