'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class UserPermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ UserRole, UserRolePermission }) {
            // define association here
            this.belongsToMany(UserRole, { through: UserRolePermission })
        }
    }

    UserPermission.init(
        {
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0
            },
            name: {
                type: DataTypes.STRING
            },
            module: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'user_permissions',
            modelName: 'UserPermission'
        }
    )

    return UserPermission
}
