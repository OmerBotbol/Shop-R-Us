const { Order } = require('../mongo/schema');

const createOrder = (req, res) => {
  const newOrder = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    totalPrice: req.body.totalPrice,
    orderDate: new Date(),
    paid: true,
  });

  newOrder
    .save()
    .then(() => {
      res.status(201).json({ status: 'order posted successfully' });
    })
    .catch((err) => {
      res.status(500).send('error occur: ' + err.message);
    });
};

const getOrderByQuery = (req, res) => {
  if (req.query.totalPrice) {
    req.query.totalPrice = parseFloat(req.query.totalPrice);
  }
  Order.find(req.query)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).send('no orders with this parameters');
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send('error occur: ' + err.message);
    });
};

module.exports = { createOrder, getOrderByQuery };
