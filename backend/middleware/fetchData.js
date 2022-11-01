var jwt = require('jsonwebtoken');
const secret = 'mySecret';
const fetchData = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a empty hai token" })
    }
    try {
        const data = jwt.verify(token, secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a galt hai token token" })
    }

}


module.exports = fetchData;