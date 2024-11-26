const mongoose = require('mongoose');
const Order = require('../models/orderModel');
require('dotenv').config();
const connectDB = require('../config/database');

const seedOrders = async () => {
  await connectDB();

  try {
    const orders = Array.from({ length: 10000 }).map((_, i) => ({
      customerName: `Customer ${i + 1}`,
      orderAmount: Math.floor(Math.random() * 1000) + 1,
      status: ['pending', 'processing', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
      items: [
        { name: 'Product A', quantity: 2, price: 100 },
        { name: 'Product B', quantity: 1, price: 50 },
      ],
      createdAt: new Date(Date.now() - Math.random() * 1e10),
    }));

    await Order.insertMany(orders);
    console.log('Orders seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedOrders();
