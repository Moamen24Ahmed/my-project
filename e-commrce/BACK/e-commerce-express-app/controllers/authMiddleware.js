const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access Denied. No token available!' });

    try {
        const decoded = jwt.verify(token, 'secretKey');
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Access Denied. Invalid token!' });
    }
};

module.exports = authMiddleware;