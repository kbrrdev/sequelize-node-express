module.exports = function (message, data, status) {
    this.status(status || 400).json({
        status: 'error',
        message: message || 'Something went wrong, try again later',
        data
    })
}
