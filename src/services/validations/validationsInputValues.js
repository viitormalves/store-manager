const { productsModel } = require('../../models');

const validateQuantityValue = (sale) => sale.every((s) => s.quantity >= 1);

const validateProductIdExist = async (sale) => {
    const ids = sale.map((s) => s.productId);
    const allProducts = await productsModel.getAllProducts();
    const allProductsId = allProducts.map((p) => p.id);
    return ids.every((id) => allProductsId.includes(id));
};

module.exports = {
    validateQuantityValue,
    validateProductIdExist,
};