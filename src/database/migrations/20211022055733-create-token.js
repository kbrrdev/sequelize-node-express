'use strict'
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('tokens', {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            expireAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        })
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('tokens')
    }
}
