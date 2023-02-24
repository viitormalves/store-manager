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
    const data = await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?',
      [name, id],
    );
    return data;
  };

const deleteProduct = async (idProduct) => {
    const data = await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?',
        [idProduct],
      );
      return data;
};

const searchProducts = async (name) => {
    const [products] = await connection.execute(
        `SELECT id, name FROM StoreManager.products WHERE name LIKE '%${name}%'`,
    );
    return products;
};

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};