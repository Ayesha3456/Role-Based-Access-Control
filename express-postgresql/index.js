const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Angular development server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);

// Sync database and start the server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
