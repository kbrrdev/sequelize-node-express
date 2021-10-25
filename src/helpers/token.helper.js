const { Token } = require('../models')

module.exports = {
    insertToken: async (userId, token, type) => {
        return await Token.create({
            userId,
            token,
            type
        })
    }
}
