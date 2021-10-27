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

                if (!permitted(req, permission))
                    return res.apiError('Access forbidden', undefined, 403)
            }

            next()
        }
    }

    admin(permission) {
        return (req, res, next) => {
            console.log(req.authUser)
            if (req.authUser.type == 'admin') {
                req.authUser.proceed = true

                if (!permitted(req, permission))
                    return res.apiError('Access forbidden', undefined, 403)
            }

            next()
        }
    }

    dev() {
        return (req, res, next) => {
            if (req.authUser.type == 'dev') req.authUser.proceed = true

            next()
        }
    }
}

const permitted = (req, permission) => {
    if (permission) {
        const userRole = req.authUser.userRole

        if (
            userRole &&
            userRole.userPermissions &&
            userRole.userPermissions.length > 0
        ) {
            const userPermission = userRole.userPermissions.find(
                (p) => p.module == permission
            )

            if (userPermission) return true
        }

        return false
    }

    return true
}

module.exports = AuthType
