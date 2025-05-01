const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    items: [
      {
        name: String,
        size: String,
        price: Number,
        quantity: Number,
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'on the way', 'delivered', 'returned'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });

module.exports = mongoose.model('Order', orderSchema);
