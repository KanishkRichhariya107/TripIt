const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const travelRoutes = require('./routes/travel.routes');
const { fetch } = require('./api/index');

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Database Connection
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB connected successfully');
	} catch (err) {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	}
};

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/src')));

// View Engine Setup
app.set('view engine', 'ejs');

// API Routes
app.get('/api/hotels', async (req, res) => {
	try {
		const hotelData = await fetch();
		
		if (!hotelData?.data?.hotels?.length) {
		return res.status(204).send(); // No Content
		}
		
		res.json(hotelData);
	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		console.error('Hotel API Error:', errorMessage);
		res.status(500).json({ 
		message: 'Failed to fetch hotel data',
		error: errorMessage
		});
	}
});

// Application Routes
app.use(travelRoutes);

// Server Initialization
const startServer = async () => {
	await connectDB();
	app.listen(PORT, () => 
		console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
	);
};

startServer();