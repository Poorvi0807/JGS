const express = require('express');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());
app.use(logger);

app.use(errorHandler);
app.use('/api/orders', orderRoutes);

module.exports = app;
