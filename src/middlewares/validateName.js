module.exports = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 5) {
        return res.status(422).json(
        { message: '"name" length must be at least 5 characters long' },
        );
    }
    next();
};