const express = require('express');
const item = express.Router();
const {
  getItems,
  postItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemsController');

item.use(express.json());

item.get('/', getItems);

item.post('/', postItem);

item.put('/:id', updateItem);

item.delete('/:id', deleteItem);

module.exports = item;
