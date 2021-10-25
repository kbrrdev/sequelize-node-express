const { checkSchema } = require('express-validator')

module.exports = {
    login: checkSchema({
        email: {
            in: ['body'],
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required',
                bail: true
            },
            isEmail: {
                errorMessage: 'Invalid email address format',
                bail: true
            }
        },
        password: {
            in: ['body'],
            trim: true,
            notEmpty: {
                errorMessage: 'This field is required',
                bail: true
            }
        }
    })
}
