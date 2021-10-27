'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_role_permissions', [
            {
                userRoleId: 1,
                userPermissionId: 2
            },
            {
                userRoleId: 1,
                userPermissionId: 3
            },
            {
                userRoleId: 1,
                userPermissionId: 4
            },
            {
                userRoleId: 2,
                userPermissionId: 4
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_role_permissions', null, {})
    }
}
