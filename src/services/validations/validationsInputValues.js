const { productsModel } = require('../../models');

const validateId = async (productId) => {
    const product = productsModel.findById(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    return { type: null, message: product };
};

module.export = {
    validateId,
};