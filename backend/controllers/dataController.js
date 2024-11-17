const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
  const { name, email, totalSpent, visits, lastVisit } = req.body;
  const customer = new Customer({ name, email, totalSpent, visits, lastVisit });
  await customer.save();
  res.status(201).json(customer);
};