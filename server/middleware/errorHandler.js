const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(err.status).json({message: err.message, err: err})
}

module.exports = errorHandler;

if (err.status == 400) {
    res.json({message: err.message, err: err})
} else if (err.status == 401) {
    res.json({message: err.message, err: err})
} else if (err.status == 500) {
    res.json({message: err.message, err: err})
}