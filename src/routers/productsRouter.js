const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validationProduct');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/search', productsController.searchProducts);
router.get('/:id', productsController.getByProductId);
router.put('/:id', validateName, productsController.updateProduct);
router.post('/', validateName, productsController.createProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;