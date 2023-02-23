const { salesModel } = require('../models');

const { validateQuantityValue, validateProductIdExist,
 } = require('./validations/validationsInputValues');

const insertSale = async (sales) => {
    if (!validateQuantityValue(sales)) {
        return { type: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    const isValid = await validateProductIdExist(sales);
    if (!isValid) return { type: 404, message: 'Product not found' };
    
    const insertId = await salesModel.insertSale(sales);
    return { message: { id: insertId, itemsSold: sales } };
};

const getAllSales = async () => {
    const allSales = await salesModel.getAllSales();
    return { message: allSales };
};

const getSaleById = async (id) => {
    const sale = await salesModel.getSaleById(id);
    if (sale.length === 0) return { type: 404, message: 'Sale not found' };
    return { message: sale };
};

const deleteSale = async (idSale) => {
    const data = await salesModel.deleteSale(idSale);
    if (data[0].affectedRows === 0) return { type: 404, message: 'Sale not found' };
    return { message: '' };
};

const updateSale = async (newSale) => {
    const { id, sale } = newSale;
    if (!validateQuantityValue(sale)) {
        return { type: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    const isValid = await validateProductIdExist(sale);
    if (!isValid) return { type: 404, message: 'Product not found' };
    
    const saleExist = await salesModel.getSaleById(id);
    if (saleExist.length === 0) return { type: 404, message: 'Sale not found' };

    await salesModel.updateSale(newSale);
    return { message: {
        saleId: id,
        itemsUpdated: sale,
    } };
};

module.exports = {
    insertSale,
    getAllSales,
    getSaleById,
    deleteSale,
    updateSale,
};