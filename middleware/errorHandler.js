const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ? req.statusCode : 500;
    console.error(err.stack);
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
        case constants.VALIDATION_ERROR:
            res.json({ title: "validation Failed", message: err.message, stackTrace: err.stack });
        case constants.FORBIDDEN:
            res.json({ title: "forbiden", message: err.message, stackTrace: err.stack });
        case constants.SERVER_ERROR:
            res.json({ title: "server error", message: err.message, stackTrace: err.stack });

        default:
            console.log("No error, all good");
            break;
    }
}

module.exports = errorHandler;