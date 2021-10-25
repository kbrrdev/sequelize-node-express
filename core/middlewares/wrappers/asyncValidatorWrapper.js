const logging = require('../../utils/logging')

module.exports = (fn) => {
    return async (value, { req, res, next }) => {
        try {
            await fn(value, { req, res, next })
        } catch (error) {
            if (error) logging.error('Validator', '', error)
            next()
        }
    }
}
