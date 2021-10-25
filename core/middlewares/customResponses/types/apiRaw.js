module.exports = function (message, data, status, statusCode) {
    this.status(statusCode || 200).json({
        status: status || 'success',
        message: message || 'Successful',
        data
    })
}
