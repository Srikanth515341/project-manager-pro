const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    console.log('Token Received:', token); // Debugging log

    if (!token) {
        console.log('No token found'); // Debugging log
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging log
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message); // Debugging log
        res.status(401).json({ msg: 'Invalid Token' });
    }
};
