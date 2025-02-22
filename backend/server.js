const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const travelRoutes=require('./routes/travelRoutes');
const { fetchData } = require('./api/index');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.get('/api/hotel', async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(4000, () => {
        console.log("Server running on port", process.env.PORT || 4000);
    });
})
.catch((err) => {
    console.error("Connection error", err);
});
app.use(travelRoutes);