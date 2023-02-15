const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSales } = require('../middlewares/validationSales');

const router = express.Router();

router.get('/:id', salesController.getSaleById);
router.post('/', validateNewSales, salesController.insertSale);
router.get('/', salesController.getAllSales);

module.exports = router;