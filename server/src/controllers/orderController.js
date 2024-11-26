const Order = require('../models/orderModel');

const getOrders = async (req, res, next) => {
  try {
    const { cursor, limit = 50, sort = 'createdAt', sortDirection = 'asc' } = req.query;

    const query = cursor ? { createdAt: { $gt: new Date(cursor) } } : {};
    const orders = await Order.find(query)
      .sort({ [sort]: sortDirection === 'asc' ? 1 : -1 })
      .limit(Number(limit));

    const nextCursor = orders.length ? orders[orders.length - 1].createdAt : null;

    res.status(200).json({
      data: orders,
      nextCursor,
      totalCount: await Order.countDocuments(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders };
