const { salesModel } = require('../models');
const { validateQuantityValue,
    validateProductIdExist,
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

module.exports = {
    insertSale,
};