const { productsModel } = require('../models');

const getAllProducts = async () => {
    const products = await productsModel.getAllProducts();
    return { message: products };
};

const getByProductId = async (productId) => {
    const product = await productsModel.getByProductId(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    return { message: product };
};

const createProduct = async (productName) => {
    const newProduct = await productsModel.createProduct(productName);
    return { message: newProduct };
};

const updateProduct = async (newDate) => {
    const { id } = newDate;
    await productsModel.updateProduct(newDate);
    const productUpdate = await productsModel.getByProductId(id);
    if (!productUpdate) return { type: 404, message: 'Product not found' };
    return { message: productUpdate };
};

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
    updateProduct,
};