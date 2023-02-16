const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
    const { message } = await productsService.getAllProducts();
    res.status(200).json(message);
};

const getByProductId = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.getByProductId(id);
    if (type) return res.status(404).json({ message });
    return res.status(200).json(message);
};

const createProduct = async (req, res) => {
    const { name } = req.body;
    const { message } = await productsService.createProduct(name);
    return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const newDate = { id: Number(id), name };

    const { type, message } = await productsService.updateProduct(newDate);
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
    updateProduct,
};