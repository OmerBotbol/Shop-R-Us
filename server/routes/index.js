const { Router } = require('express');
const api = Router();
const item = require('./item');
const order = require('./order');
const user = require('./user');

api.use('/item', item);
api.use('/order', order);
api.use('/user', user);

module.exports = api;
