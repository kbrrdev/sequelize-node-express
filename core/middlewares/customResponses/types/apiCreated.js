module.exports = function (message, data) {
    this.status(201).json({
        status: 'success',
        message: message || 'Created successfully',
        data
    })
}
