const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
const corsOptions = {
    origin: 'https://jgs-frontend.vercel.app/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };


app.use(cors(corsOptions)); 
app.use(express.json());
app.use(logger);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
