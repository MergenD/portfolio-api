const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.slice(7);
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided.' });
    }

    let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (decoded.username !== 'mergen' && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
