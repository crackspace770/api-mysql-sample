import express from 'express'

import authRoute from './route/auth.route.js';  // Import default export

import { initAuthTable } from './model/auth.model.js'; // Make sure table is initialized
import { db } from './utils/db.js'; // Ensure DB is imported and connected


const app = express()
app.use(express.json());


app.listen(3000, () => {
  console.log('Server is running on port 3000')

  });

app.get('/', (req, res) => { 
  res.send('Hello World!')

});

app.use('/api/auth', authRoute);

db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
    initAuthTable(); // Ensure auth table is created on startup
    app.listen(3000, () => {
      console.log('🚀 Server is running on port 3000');
    });
  }
});