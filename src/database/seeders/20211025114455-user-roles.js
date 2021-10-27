'use strict'
const moment = require('moment')
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_roles', [
            {
                id: 1,
                name: 'Super Admin',
                createdAt: moment().toDate(),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                id: 2,
                name: 'Admin',
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_roles', null, {})
    }
}
