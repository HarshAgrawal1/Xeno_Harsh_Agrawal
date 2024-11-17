const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
