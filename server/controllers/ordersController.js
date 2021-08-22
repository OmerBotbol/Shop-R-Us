const { Order } = require('../mongo/schema');

const createOrder = (req, res) => {
  const newOrder = new Order({
    userId: req.body.userId,
    items: req.body.items,
    totalPrice: req.body.totalPrice,
    orderDate: new Date(),
    paid: true,
  });

  console.log(req.body.items);

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
