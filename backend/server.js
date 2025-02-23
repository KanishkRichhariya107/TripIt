const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const travelRoutes = require('./routes/travelRoutes');
const { fetchData } = require('./api/index');

dotenv.config();
const app = express();

// Middleware to parse JSON and URL-encoded data (for forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, 'views')));

// API route example
app.get('/api/hotel', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Use travel routes for signup and login
app.use(travelRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server running on port", process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
  });