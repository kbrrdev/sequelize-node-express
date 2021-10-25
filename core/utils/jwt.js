const jsonwebtoken = require('jsonwebtoken')
const config = require('../../src/configs/config')

const generateAccessToken = (data) => {
    const accessToken = config.JWT_ACCESS_TOKEN

    return jsonwebtoken.sign(data, accessToken, {
        expiresIn: config.JWT_ACCESS_EXPIRE + 'm'
    })
}

const generateRefreshToken = (data) => {
    const refreshToken = config.JWT_REFRESH_TOKEN

    return jsonwebtoken.sign(data, refreshToken)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
