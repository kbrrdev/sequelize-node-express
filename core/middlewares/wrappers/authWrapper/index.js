const asyncWrapper = require('../asyncWrapper')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../../../../src/configs/config')
const AuthType = require('./authType')

const authWrapper = (...auth) => {
    let items = auth

    if (Array.isArray(auth[0])) items = auth[0]

    // include dev authType
    items.push('dev')

    if (items.length > 0) {
        const authType = new AuthType()

        items = items.map((item) => {
            let permission

            if (item.indexOf(':') > -1) {
                item = item.split(':')
                permission = item[1]
                item = item[0]
            }

            const method = authType[item](permission)

            if (method) return method

            throw new Error(`Invalid auth ${item}`)
        })
    }

    return [authenticate, ...items, authValidator]
}

const authenticate = asyncWrapper(async (req, res, next) => {
    req.authUser = {
        proceed: false
    }

    const authHeader = req.headers['authorization']

    if (authHeader) {
        const token = authHeader && authHeader.split(' ')[1]

        const accessToken = config.JWT_ACCESS_TOKEN

        try {
            const decoded = jsonwebtoken.verify(token, accessToken)

            req.authUser = {
                ...req.authUser,
                ...decoded
            }
        } catch (error) {
            return res.apiError('Invalid authorization token', undefined, 401)
        }
    }

    next()
})

const authValidator = (req, res, next) => {
    if (!req.authUser.proceed)
        return res.apiError('Unauthorized access', undefined, 401)

    next()
}

module.exports = authWrapper
