const express = require('express');
const {
  register,
  login,
  validateToken,
  getUserById,
  updateUser,
} = require('../controllers/userController');
const user = express.Router();

user.use(express.json());

user.post('/create', register);

user.post('/login', login);

user.get('/', validateToken, getUserById);

user.put('/:id', validateToken, updateUser);

user.get('/data', validateToken, (req, res) => {
  const { data } = req;
  res.send(data);
});

module.exports = user;
