const logging = require('../utils/logging')
const asyncWrapper = require('./wrappers/asyncWrapper')

const logger = asyncWrapper(async (req, res, next) => {
    logging.info(
        'API Start',
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    )

    res.on('finish', () => {
        logging.info(
            'API End',
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        )
    })

    next()
})

module.exports = logger
