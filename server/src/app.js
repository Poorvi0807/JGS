// const express = require('express');
// const connectDB = require('./config/database');
// const orderRoutes = require('./routes/orderRoutes');
// const { errorHandler } = require('./utils/errorHandler');
// const logger = require('./utils/logger');
// require('dotenv').config();

// connectDB();

// const app = express();

// app.use(express.json());
// app.use(logger);

// app.use(errorHandler);
// app.use('/api/orders', orderRoutes);

// module.exports = app;
const express = require('express');
const cors = require('cors'); // Import the cors module
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
require('dotenv').config();

connectDB();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };

// Enable CORS for the frontend
app.use(cors(corsOptions));  // This will allow all origins by default

app.use(express.json());
app.use(logger);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

module.exports = app;
