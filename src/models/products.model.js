const connection = require('./connection');
// const camelize = require('camelize');

const getAllProducts = async () => {
    const [result] = await connection.execute(
        'SELECT id, name FROM StoreManager.products',
    );
    return result;
};
const getByProductId = async (productId) => {
    const [[product]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?;', [productId],
    );
    return product;
};

module.exports = {
    getAllProducts,
    getByProductId,
};