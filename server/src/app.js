const express = require('express');
const cors = require('cors'); 
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


app.use(cors(corsOptions)); 
app.use(express.json());
app.use(logger);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

module.exports = app;
