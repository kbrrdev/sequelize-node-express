'use strict'
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('user_permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            module: {
                type: DataTypes.STRING
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_permissions')
    }
}
