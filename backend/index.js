const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import DB connection
const routes = require('./routes/router'); // Import routes
const authrouter = require('./routes/authRoutes')
const { errorHandler } = require('./middleware/errorMiddleware'); // Import error handler
const logger = require('./utills/logger'); // Import logger
const cors = require('cors')

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors())

// Connect to the database
connectDB();

// Use routes
app.use('/api/', routes);
app.use('/api/auth/', authrouter)

// Error handling middleware
app.use(errorHandler);

app.use('*', (req, res) => {
    res.json('ROUTE NOT FOUND')
})

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
