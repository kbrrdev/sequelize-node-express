const { checkSchema } = require('express-validator')
const asyncValidatorWrapper = require('../../core/middlewares/wrappers/asyncValidatorWrapper')
const { User } = require('../models')

const paramsId = {
    id: {
        in: ['params'],
        trim: true,
        notEmpty: {
            errorMessage: 'This field is required'
        }
    }
}

module.exports = {
    create: checkSchema({
        firstName: {
            in: ['body'],
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required'
            }
        },
        lastName: {
            in: ['body'],
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required'
            }
        },
        email: {
            in: ['body'],
            trim: true,
            toLowerCase: true,
            notEmpty: {
                errorMessage: 'This field is required',
                bail: true
            },
            isEmail: {
                errorMessage: 'Invalid email address',
                bail: true
            }
        }
    }),

    update: checkSchema({
        ...paramsId,
        firstName: {
            in: ['body'],
            optional: true,
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required'
            }
        },
        lastName: {
            in: ['body'],
            optional: true,
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required'
            }
        }
    }),

    get: checkSchema(paramsId),

    delete: checkSchema(paramsId)
}
