const express = require('express')
const authWrapper = require('../../core/middlewares/wrappers/authWrapper')
const validatorWrapper = require('../../core/middlewares/wrappers/validatorWrapper')

// controllers
const authController = require('../controllers/auth.controller')

// validators
const authValidator = require('../validators/auth.validator')

const router = express.Router()

router
    .route('/auth/login')
    .post(validatorWrapper(authValidator.login), authController.login)

router
    .route('/auth/logout')
    .post(authWrapper('public', 'client', 'admin'), authController.logout)

router
    .route('/auth/refresh-token')
    .post(authWrapper('public'), authController.refreshToken)

router
    .route('/auth/admin/login')
    .post(
        authWrapper('public'),
        validatorWrapper(authValidator.login),
        authController.login
    )

router
    .route('/auth/admin/logout')
    .post(authWrapper('public', 'admin'), authController.logout)

router
    .route('/auth/admin/refresh-token')
    .post(authWrapper('public'), authController.refreshToken)

module.exports = router
