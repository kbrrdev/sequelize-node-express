const logging = require('../utils/logging')
const { CustomAPIError } = require('../errors/custom-error')

const errorHandler = (error, req, res, next) => {
    logging.error('Server', '', error)

    if (['prod', 'production'].includes(process.env.NODE_ENV)) {
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong, try again later.'
        })
    }

    return res.status(500).json({
        status: 'error',
        message: error.message
    })
}

module.exports = errorHandler
