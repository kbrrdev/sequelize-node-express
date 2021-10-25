const { validationResult } = require('express-validator')
const asyncWrapper = require('./asyncWrapper')

const validatorWrapper = (...validators) => {
    let items = validators

    if (Array.isArray(validators[0])) items = validators[0]

    return [...items, errorValidator]
}

const errorValidator = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        let validationErrors = errors.array().map((error) => ({
            msg: error.msg,
            param: error.param,
            location: error.location
        }))

        return res.apiError('Validation error', validationErrors)
    } else {
        next()
    }
})

module.exports = validatorWrapper
