const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Main Root
app.get('/', (req, res) => {
    res.send('Lavana E-Commerce API is running...');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Static file support for product images if needed
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

// Connect to local MongoDB if URI is not provided
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log('Database connection error:', err));
