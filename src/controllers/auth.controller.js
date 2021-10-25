const asyncWrapper = require('../../core/middlewares/wrappers/asyncWrapper')
const { User, Token } = require('../models')
const { Op } = require('sequelize')
const jwt = require('../../core/utils/jwt')
const moment = require('moment')
const jsonwebtoken = require('jsonwebtoken')
const toolsUtil = require('../utils/tools.util')
const config = require('../configs/config')
const bcrypt = require('bcrypt')

module.exports = {
    login: asyncWrapper(async (req, res, next) => {
        const { url, body, cookies } = req
        let { refreshToken } = cookies
        const { email, password } = body

        let where = {}

        where.email = email

        if (url.indexOf('admin') > -1) where.type = 'admin'

        const user = await User.findOne({ where })

        if (!user) return res.apiError('Invalid email or password')

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.apiError('Invalid email or password')

        if (!user.isVerified && user.type != 'admin') {
            // resend email

            return res.apiError(
                'Email not verified, code has been sent to your email'
            )
        }

        if (refreshToken) {
            await Token.destroy({
                where: {
                    userId: user.id,
                    token: refreshToken
                }
            })
        }

        const accessToken = jwt.generateAccessToken({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type
        })

        refreshToken = jwt.generateRefreshToken({
            email: user.email
        })

        await Token.create({
            userId: user.id,
            token: refreshToken,
            type: 'refreshToken'
        })

        res.cookie('refreshToken', refreshToken, {
            expires: new Date(moment().add(1, 'months').toDate()),
            httpOnly: true,
            signed: config.NODE_ENV == 'prod'
        })

        return res.apiOk('Login successfully', { accessToken })
    }),

    register: asyncWrapper(async (req, res, next) => {
        const { email, firstName, lastName, password } = req.body

        const verificationCode = toolsUtil.generateRandomString(6)

        const user = await User.create({
            email,
            firstName,
            lastName,
            password,
            type: 'client'
        })

        const token = await Token.create({
            userId: user.id,
            token: verificationCode,
            type: 'verificationCode'
        })

        // email sender
        // const emailSending = email.send(user.email, ,)

        // if (!emailSending) {
        //     await user.destroy({ paranoid: false })
        //     return next(
        //         createError('Something went wrong, please try again later', 500)
        //     )
        // }

        return res.apiCreated('Verify email to proceed')
    }),

    resendVerificationCode: asyncWrapper(async (req, res, next) => {
        const { email } = req.query

        const user = await User.findOne({
            where: {
                email,
                isVerified: 0
            }
        })

        if (!user) return res.apiError('Email address is already verified')

        const verificationCode = toolsUtil.generateRandomString(6)

        const token = await Token.create({
            userId: user.id,
            token: verificationCode
        })

        // const emailSending =

        req.apiOk('Email successfully verified')
    }),

    verify: asyncWrapper(async (req, res, next) => {
        const { email, verificationCode } = req.query

        const user = await User.findOne({
            where: {
                email,
                verificationCode
            }
        })

        if (!user) return res.apiError('Invalid verification token')

        user.isValid = 1

        await user.save()

        req.apiOk('Email successfully verified')
    }),

    logout: asyncWrapper(async (req, res, next) => {
        let { refreshToken } = req.cookie

        if (!refreshToken) return res.apiError('Missing refresh token')

        const jwtRefreshToken = config.JWT_ACCESS_TOKEN

        let user, type
        if (url.indexOf('admin') > -1) type = admin

        try {
            const decoded = jsonwebtoken.verify(refreshToken, jwtRefreshToken)

            user = await User.findOne({
                where: {
                    email: decoded.email,
                    refreshToken,
                    type
                }
            })
        } catch (error) {}

        if (user) {
            refreshToken = jwt.generateRefreshToken({
                email: moment().format('lll')
            })

            await user.save()
        }

        return res.apiOk('Logout successfully')
    }),

    forgotPassword: asyncWrapper(async (req, res, next) => {}),

    resetPassword: asyncWrapper(async (req, res, next) => {}),

    refreshToken: asyncWrapper(async (req, res, next) => {
        const { refreshToken } = req.cookie

        if (!refreshToken) return res.apiError('Missing refresh token')

        const jwtRefreshToken = config.JWT_ACCESS_TOKEN

        let user, type, token
        if (url.indexOf('admin') > -1) type = 'admin'

        try {
            const decoded = jsonwebtoken.verify(refreshToken, jwtRefreshToken)

            user = await User.findOne({
                where: {
                    id: decoded.id,
                    type
                }
            })

            token = await Token.findOne({
                where: {
                    userId: user.id,
                    token: refreshToken,
                    type: 'refreshToken'
                }
            })
        } catch (error) {}

        if (!user || !token)
            return res.apiError('Invalid or expired refresh token')

        const accessToken = jwt.generateAccessToken({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type
        })

        return res.apiOk('Token refreshed successfully', {
            accessToken
        })
    })
}
