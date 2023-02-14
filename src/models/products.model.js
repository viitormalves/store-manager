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

const createProduct = async (productName) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.products (name) VALUES (?)', [productName],
        );
    const [[newProduct]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?', [insertId],
        );
    return newProduct;
};

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
};