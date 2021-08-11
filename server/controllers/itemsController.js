const { Item } = require('../mongo/schema');

const postItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
    uploadDate: new Date(),
  });

  newItem
    .save()
    .then(() => {
      res.status(201).json({ status: 'item upload successfully' });
    })
    .catch((err) => {
      res.status(500).send('error occur: ' + err.message);
    });
};

const getItems = (req, res) => {
  if (req.query.price) {
    req.query.price = parseFloat(req.query.price);
  }
  Item.find(req.query)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).send('no items with this parameters');
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send('error occur: ' + err.message);
    });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndUpdate(id, req.body, { new: true, rawResult: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ msg: 'failed to find this ID' });
      }
      res.send({ status: 'item updated successfully' });
    })
    .catch((err) => {
      res.status(400).send('error occur: ' + err.message);
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ msg: 'failed to find this ID' });
      }
      res.send({ status: 'item deleted successfully' });
    })
    .catch((err) => {
      res.status(400).send('error occur: ' + err.message);
    });
};

module.exports = { postItem, getItems, updateItem, deleteItem };
