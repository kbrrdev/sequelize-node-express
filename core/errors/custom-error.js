class CustomAPIError extends Error {
    constructor(message, statusCode, data) {
        super(message)
        this.statusCode = statusCode
        this.data = data
    }
}

const createError = (message, statusCode, data) => {
    return new CustomAPIError(message, statusCode, data)
}

module.exports = { createError, CustomAPIError }
