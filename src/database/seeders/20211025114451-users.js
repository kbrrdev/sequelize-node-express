'use strict'
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const password = await bcrypt.hash('qweasd', 10)
        await queryInterface.bulkInsert('users', [
            {
                id: 1,
                firstName: 'Developer',
                lastName: 'Account',
                email: 'dev@gmail.com',
                password,
                type: 'dev',
                isVerified: 1,
                status: 'active',
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            },
            {
                id: 2,
                firstName: 'Super Administrator',
                lastName: 'Account',
                email: 'superadmin@gmail.com',
                password,
                type: 'admin',
                isVerified: 1,
                status: 'active',
                userRoleId: 1,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            },
            {
                id: 3,
                firstName: 'Administrator',
                lastName: 'Account',
                email: 'admin@gmail.com',
                password,
                type: 'admin',
                isVerified: 1,
                status: 'active',
                userRoleId: 2,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            },
            {
                id: 4,
                firstName: 'Client',
                lastName: 'Account',
                email: 'client@gmail.com',
                password,
                type: 'client',
                isVerified: 1,
                status: 'active',
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {})
    }
}
