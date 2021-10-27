const asyncWrapper = require('../../core/middlewares/wrappers/asyncWrapper')
const { User, UserRole, UserPermission } = require('../models')

module.exports = {
    create: asyncWrapper(async (req, res, next) => {
        const { firstName, lastName, email, type } = req.body

        const existingUser = await User.findOne({
            where: {
                email
            }
        })

        if (existingUser) return res.apiError('Email already in use')

        // const password = toolsUtil.generateRandomString(8)
        const password = 'qweasd'

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            type
        })

        return res.apiCreated('', user)
    }),

    update: asyncWrapper(async (req, res, next) => {
        const { id } = req.params
        const { firstName, lastName } = req.body
        const { authUser } = req

        const user = await User.findOne({
            where: {
                id
            }
        })

        if (!user) return res.apiError('User not found')

        user.firstName = firstName
        user.lastName = lastName

        if (authUser.id) {
            user.updatedBy = authUser.id
        }

        await user.save()
        await user.reload()

        return res.apiUpdated('', {
            fullName: user.fullName,
            ...user.dataValues,
            password: undefined
        })
    }),

    get: asyncWrapper(async (req, res, next) => {
        const { id } = req.params

        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: UserRole,
                    as: 'userRole',
                    attributes: ['name', 'description'],
                    include: [
                        {
                            model: UserPermission,
                            as: 'userPermissions',
                            attributes: ['name', 'module'],
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }
            ]
        })

        if (!user) return res.apiError('User not found', user)

        return res.apiOk('', user)
    }),

    getMany: asyncWrapper(async (req, res, next) => {
        const { sort } = req.query
        const order = sort && [sort.split('-')]

        const users = await User.findAll({
            order
        })

        return res.apiOk('', users)
    })
}
