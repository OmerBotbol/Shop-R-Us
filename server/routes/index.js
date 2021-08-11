const { Router } = require('express');
const api = Router();
const item = require('./item');
const order = require('./order');

api.use('/item', item);
api.use('/order', order);

module.exports = api;
