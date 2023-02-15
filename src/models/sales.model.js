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

const getAllSales = async () => {
    const [allSale] = await connection.execute(
        'SELECT id AS saleId, date, product_id AS productId, quantity '
        + 'FROM StoreManager.sales AS s '
        + 'INNER JOIN StoreManager.sales_products AS sp ON sp.sale_id = s.id ',
        +'ORDER BY s.id, sp.product_id',
    );
    return allSale;
};

const getSaleById = async (id) => {
    const [sale] = await connection.execute(
        'SELECT date, product_id AS productId, quantity '
        + 'FROM StoreManager.sales AS s '
        + 'INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id '
        + 'WHERE id = ? ORDER BY sp.product_id', [id],
    );
    return sale;
};

// const checkSale = async () => {
//     const [sale] = 
// }

module.exports = {
    insertSale,
    getAllSales,
    getSaleById,
};