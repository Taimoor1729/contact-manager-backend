const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const valdiateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers['authorization'];
    console.log("authheader", authHeader);

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // extract token
        console.log("token, token", token)

        jwt.verify(token, process.env.ACCESS_TOKEN || 'temitech669', (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("This user is not authorized");
            }
            req.user = decoded.user; // store decoded payload (optional)
            next(); // call next middleware
        });
    } else {
        res.status(401);
        throw new Error("No token provided or malformed header");
    }

    if(!token){("token is missing in the request")
        res.status(401)
        throw new Error("token is missing in the request")
    }
});

module.exports = valdiateToken;
