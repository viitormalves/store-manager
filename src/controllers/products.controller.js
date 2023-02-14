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

module.exports = {
    getAllProducts,
    getByProductId,
};