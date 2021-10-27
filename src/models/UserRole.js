'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, UserPermission, UserRolePermission }) {
            // define association here

            this.hasOne(User, { foreignKey: 'userRoleId' })
            this.belongsToMany(UserPermission, {
                through: UserRolePermission,
                as: 'userPermissions'
            })
        }
    }
    UserRole.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            sequelize,
            tableName: 'user_roles',
            modelName: 'UserRole'
        }
    )
    return UserRole
}
