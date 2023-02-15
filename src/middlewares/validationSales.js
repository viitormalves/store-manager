const validateNewSales = (req, res, next) => {
    const sale = req.body;
    const validateProductId = sale.every((e) => e.productId);
  if (!validateProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const validateQuantity = sale.some((e) => e.quantity || e.quantity === 0);
  if (!validateQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
    validateNewSales,
};