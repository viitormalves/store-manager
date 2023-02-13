const { productsModel } = require('../models');

const findAll = async () => {
    const products = await productsModel.findAll();
    return { message: products };
};

const findById = async (productId) => {
    const product = await productsModel.findById(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    return { message: product };
};

module.exports = {
    findAll,
    findById,
};