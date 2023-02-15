const { salesServices } = require('../services');

const insertSale = async (req, res) => {
    const sale = req.body;
    const { type, message } = await salesServices.insertSale(sale);
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
};

module.exports = {
    insertSale,
};