'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_permissions', [
            // users
            {
                id: 1,
                parentId: 0,
                name: 'Users'
            },
            {
                id: 2,
                parentId: 1,
                name: 'Create User',
                module: 'createUser'
            },
            {
                id: 3,
                parentId: 1,
                name: 'Update User',
                module: 'updateUser'
            },
            {
                id: 4,
                parentId: 1,
                name: 'View User',
                module: 'viewUser'
            },

            // user roles
            {
                id: 1,
                parentId: 0,
                name: 'User Roles'
            },
            {
                id: 2,
                parentId: 1,
                name: 'Create User Role',
                module: 'createUser'
            },
            {
                id: 3,
                parentId: 1,
                name: 'Update User Role',
                module: 'updateUserRole'
            },
            {
                id: 4,
                parentId: 1,
                name: 'View User Role',
                module: 'viewUserRole'
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_permissions', null, {})
    }
}
