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
    if (!name) return res.status(400).json({ message: '"name" is required' }); 
    if (name.length < 5) {
    return res.status(422).json(
        { message: '"name" length must be at least 5 characters long' },
        );
    }
    const { message } = await productsService.createProduct(name);
    return res.status(201).json(message);
};

module.exports = {
    getAllProducts,
    getByProductId,
    createProduct,
};