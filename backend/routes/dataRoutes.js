const express = require('express');
const { addCustomer, addOrder } = require('../controllers/dataIngestionController');
const router = express.Router();

router.post('/customer', addCustomer);
router.post('/order', addOrder);

module.exports = router;
