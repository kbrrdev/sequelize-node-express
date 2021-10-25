const notFound = (req, res, next) => {
    return res.status(404).json({
        status: 'error',
        message: 'API not found'
    })
}

module.exports = notFound
