const connection = require('./connection');
// const camelize = require('camelize');

const findAll = async () => {
    const [result] = await connection.execute(
        'SELECT id, name FROM StoreManager.products',
    );
    return result;
};
const findById = async (productId) => {
    const [[product]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?;', [Number(productId)],
    );
    return product;
};

module.exports = {
    findAll,
    findById,
};