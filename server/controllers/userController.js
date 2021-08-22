require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../mongo/schema');

const register = async (req, res) => {
  const reg = '[a-zA-Z0-9]$';
  const { email, password } = req.body;
  if (
    email === '' ||
    password === '' ||
    !email.match(reg) ||
    !password.match(reg) ||
    password.length < 8
  )
    return res.status(403).send('Invalid email or password');
  const exists = await User.findOne({ email: email });
  if (exists) return res.status(409).send('Email exists');
  const encryptedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email,
    password: encryptedPassword,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    isAdmin: false,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({ status: 'user created successfully' });
    })
    .catch((err) => {
      res.status(500).send('error occur: ' + err.message);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email: email }, null, { lean: true });
  if (!userData) return res.status(404).json({ error: "User doesn't exists" });
  const isUserPasswordCorrect = bcrypt.compareSync(password, userData.password);
  if (!isUserPasswordCorrect)
    return res.status(403).json({ error: 'Incorrect password' });
  const dataToSend = { ...userData };
  dataToSend.password = undefined;
  dataToSend.__v = undefined;
  const token = jwt.sign(dataToSend, process.env.ACCESS_TOKEN);
  res.send([dataToSend._id, dataToSend.isAdmin, token]);
};

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token.length < 10) return res.status(401).send('Access Token Required');
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Invalid Access Token');
    }
    req.data = decoded;
    next();
  });
}

module.exports = { register, login, validateToken };
