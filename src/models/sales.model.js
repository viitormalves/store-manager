const connection = require('./connection');

const insertSale = async (sale) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
    );

    const sales = sale.map((s) => `(${insertId} ,${s.productId}, ${s.quantity})`).join(', ');

    await connection.execute(
        `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${sales}`,
    );
    return insertId;
};

// const findSale = async (saleId) => {
//     const sale = await connection.execute(
//         'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [saleId]
//     );
//     return sale;
// }

module.exports = {
    insertSale,
    // findSale,
};