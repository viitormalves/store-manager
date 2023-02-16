const connection = require('./connection');

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
    return { id: insertId, name: productName };
};

const updateProduct = async ({ name, id }) => { 
    await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?',
      [name, id],
    );
  };

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
    updateProduct,
};