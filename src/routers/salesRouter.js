const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSales } = require('../middlewares/validationSales');

const router = express.Router();

router.post('/', validateNewSales, salesController.insertSale);

module.exports = router;