const validateName = (productName) => {
    const isNotValid = productName.length < 5;
    if (isNotValid) {
        return {
            type: 'PRODUCT_NAME_INVALID',
            message: '"name" length must be at least 5 characters long',
        };
    }
};

module.exports = {
    validateName,
};