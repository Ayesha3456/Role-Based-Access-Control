const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200', // Replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.use(bodyParser.json());

// Database Connection (PostgreSQL with Sequelize)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false, // Disable logging in production
});

// Test Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync Sequelize Models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully!');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

// Define Routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Serverless Export for Vercel
module.exports = app;
