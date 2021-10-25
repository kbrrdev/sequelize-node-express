module.exports = function (message, data) {
    this.json({
        status: 'success',
        message: message || 'Updated successfully',
        data
    })
}
