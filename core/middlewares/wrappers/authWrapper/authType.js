const asyncWrapper = require('../asyncWrapper')

class AuthType {
    public(permission) {
        if (permission)
            throw new Error('Permission on public is not applicable')

        return (req, res, next) => {
            req.authUser.proceed = true

            next()
        }
    }

    client(permission) {
        return (req, res, next) => {
            if (req.authUser.type == 'client') {
                req.authUser.proceed = true

                if (req.authUser.permissions && permission)
                    if (!req.authUser.permissions.includes(permission))
                        return res.apiError(
                            'Unauthorized access',
                            undefined,
                            403
                        )
            }

            next()
        }
    }

    admin(permission) {
        return (req, res, next) => {
            if (req.authUser.type == 'admin') {
                req.authUser.proceed = true

                if (req.authUser.permissions && permission)
                    if (!req.authUser.permissions.includes(permission))
                        return res.apiError(
                            'Unauthorized access',
                            undefined,
                            403
                        )
            }

            next()
        }
    }
}

module.exports = AuthType
