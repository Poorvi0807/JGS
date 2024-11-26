const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  orderAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    required: true,
  },
  items: [itemSchema],
  createdAt: { type: Date, default: Date.now },
});

orderSchema.index({ createdAt: 1 }); // Index for efficient querying

module.exports = mongoose.model('Order', orderSchema);
