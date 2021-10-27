'use strict'
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            middleName: { type: DataTypes.STRING(50) },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'client'
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            status: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: 'pending'
            },
            userRoleId: {
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users')
    }
}
