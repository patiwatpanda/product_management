const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const productRoutes = require('./routers/productRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const userRoutes = require('./routers/userRoutes');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// // Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// // Root route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to Products Management API',
//         version: '1.0.0',
//         endpoints: {
//             products: '/api/products',
//             categories: '/api/categories',
//             users: '/api/users'
//         }
//     });
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).json({
//         status: 'OK',
//         timestamp: new Date().toISOString(),
//         uptime: process.uptime()
//     });
// });

// // 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({
//         error: 'Route not found',
//         message: `Cannot ${req.method} ${req.originalUrl}`
//     });
// });

// // Global error handler
// app.use((error, req, res, next) => {
//     console.error('Error:', error);
    
//     res.status(error.status || 500).json({
//         error: error.message || 'Internal Server Error',
//         ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
//     });
// });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/api`);
    console.log(`Web Interface: http://localhost:${PORT}`);
});

module.exports = app;
