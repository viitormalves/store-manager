const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSales } = require('../middlewares/validationSales');

const router = express.Router();

router.post('/', validateNewSales, salesController.insertSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.put('/:id', validateNewSales, salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;