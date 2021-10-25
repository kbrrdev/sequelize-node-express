'use strict'
const { Model } = require('sequelize')
const moment = require('moment')
const config = require('../configs/config')
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here

            this.belongsTo(User, { foreignKey: 'userId' })
        }
    }

    Token.init(
        {
            userId: { type: DataTypes.INTEGER },
            token: { type: DataTypes.TEXT },
            type: { type: DataTypes.STRING },
            expireAt: { type: DataTypes.DATE }
        },
        {
            sequelize,
            tableName: 'tokens',
            modelName: 'Token',
            timestamps: false,
            indexes: [{ fields: ['userId'] }],
            hooks: {
                beforeCreate: (token) => {
                    if (token.type == 'refreshToken') {
                        token.expireAt = moment().add(
                            config.JWT_REFRESH_EXPIRE,
                            'days'
                        )
                    } else {
                        token.expireAt = moment().add(10, 'minute')
                    }
                }
            }
        }
    )

    Token.removeAttribute('id')

    return Token
}
