const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(err?.status || 500).json({message: err?.message || "unexpected error occurred.", err: err})
}

module.exports = errorHandler;