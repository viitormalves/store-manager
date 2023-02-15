const { salesServices } = require('../services');

const insertSale = async (req, res) => {
    const sale = req.body;
    const { type, message } = await salesServices.insertSale(sale);
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
    const { message } = await salesServices.getAllSales();
    return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesServices.getSaleById(Number(id));
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

module.exports = {
    insertSale,
    getAllSales,
    getSaleById,
};