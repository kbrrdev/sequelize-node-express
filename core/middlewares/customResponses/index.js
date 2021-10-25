const apiCreated = require('./types/apiCreated')
const apiDeleted = require('./types/apiDeleted')
const apiOk = require('./types/apiOk')
const apiRaw = require('./types/apiRaw')
const apiUpdated = require('./types/apiUpdated')
const apiError = require('./types/apiError')

class CustomResponse {
    static handler(req, res, next) {
        res.apiCreated = apiCreated
        res.apiDeleted = apiDeleted
        res.apiUpdated = apiUpdated
        res.apiError = apiError
        res.apiRaw = apiRaw
        res.apiOk = apiOk

        next()
    }
}

module.exports = CustomResponse
