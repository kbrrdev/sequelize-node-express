'use strict'
const { Model } = require('sequelize')
const { UserRole, UserPermission } = require('../models')

module.exports = (sequelize, DataTypes) => {
    class UserRolePermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    UserRolePermission.init(
        {
            userRoleId: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserRole,
                    key: 'id'
                }
            },
            userPermissionId: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserPermission,
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            tableName: 'user_role_permissions',
            modelName: 'UserRolePermission',
            timestamps: false,
            indexes: [{ fields: ['userRoleId'] }]
        }
    )

    UserRolePermission.removeAttribute('id')

    return UserRolePermission
}
