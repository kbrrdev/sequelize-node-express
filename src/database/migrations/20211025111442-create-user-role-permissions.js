'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_role_permissions', {
            userRoleId: {
                type: Sequelize.INTEGER
            },
            userPermissionId: {
                type: Sequelize.INTEGER
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_role_permissions')
    }
}
