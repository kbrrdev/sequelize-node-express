'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Token, User }) {
            // define association here

            this.hasMany(Token, { foreignKey: 'userId' })
        }
    }

    User.init(
        {
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`
                },
                set() {
                    throw new Error('Do not try to set the `fullName` value!')
                }
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
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
            indexes: [{ unique: true, fields: ['email'] }],
            hooks: {
                beforeCreate: async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10)

                    user.password = hashedPassword
                },
                beforeUpdate: async (user) => {
                    if (
                        user.dataValues.password !==
                        user._previousDataValues.password
                    ) {
                        const hashedPassword = await bcrypt.hash(
                            user.password,
                            10
                        )

                        user.password = hashedPassword
                    }
                },
                afterCreate: (user) => {
                    console.log(user)
                    user.password = undefined
                }
            }
        }
    )
    return User
}
