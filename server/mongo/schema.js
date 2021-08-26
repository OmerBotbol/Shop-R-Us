const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  imageUrl: String,
  description: String,
  price: Number,
  uploadDate: Date,
});

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [itemSchema],
  totalPrice: Number,
  orderDate: Date,
  paid: Boolean,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  country: String,
  city: String,
  address: String,
  phoneNumber: String,
  isAdmin: Boolean,
});

const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Item, Order, User };
