const validateName = (productName) => {
    const isValid = productName.length >= 5;
    if (!isValid) {
        return {
            type: 'PRODUCT_NAME_INVALID',
            message: '"name" length must be at least 5 characters long',
        };
    }
};

module.exports = {
    validateName,
};