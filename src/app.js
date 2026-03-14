const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', require('./routes'));

app.get('/', (req, res) => {
    res.send('PM International School API is running...');
});

// Import and use routes (to be added)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/admissions', require('./routes/admissionRoutes'));

module.exports = app;
