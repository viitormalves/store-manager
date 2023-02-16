const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validationProduct');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getByProductId);
router.put('/:id', validateName, productsController.updateProduct);
router.post('/', validateName, productsController.createProduct);

module.exports = router;