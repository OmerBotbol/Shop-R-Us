const express = require('express');
const {
  createOrder,
  getOrderByQuery,
} = require('../controllers/ordersController');
const order = express.Router();

order.use(express.json());

order.post('/', createOrder);

order.get('/', getOrderByQuery);

module.exports = order;
