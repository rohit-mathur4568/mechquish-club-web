const jwt = require('jsonwebtoken');

module.exports = function ( req , res , next ) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).jso({msg: "No token, authorization denied"});

    try {
        const decode = jwt.verify(token, process.JWT_SECRET);
        req.user = decoded;

        //Security Check:
        if (req.user.role !== 'admin') {
            return res.status(403).json( {msg: "Access denied. Admins only." });
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid"});
    }
}