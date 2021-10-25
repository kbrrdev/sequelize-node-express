const express = require('express')
const authWrapper = require('../../core/middlewares/wrappers/authWrapper')
const validatorWrapper = require('../../core/middlewares/wrappers/validatorWrapper')

// controllers
const userController = require('../controllers/user.controller')

// validators
const userValidator = require('../validators/user.validator')

const router = express.Router()

router
    .route('/users')
    .post(
        authWrapper('public', 'client', 'admin:createUser'),
        validatorWrapper(userValidator.create),
        userController.create
    )
    .get(
        authWrapper('public', 'client', 'admin:viewUser'),
        validatorWrapper(),
        userController.getMany
    )

router
    .route('/users/:id')
    .get(
        authWrapper('public', 'client', 'admin:viewUser'),
        validatorWrapper(userValidator.get),
        userController.get
    )
    .patch(
        authWrapper('public', 'client', 'admin:updateUser'),
        validatorWrapper(userValidator.update),
        userController.update
    )

module.exports = router
