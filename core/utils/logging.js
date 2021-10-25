const moment = require('moment')

const getTimeStamp = () => {
    return moment().format('lll')
}

const logging = {
    info: (namespace, message, object) => {
        if (object) {
            console.info(
                `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
                object
            )
        } else {
            console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
        }
    },

    warn: (namespace, message, object) => {
        if (object) {
            console.warn(
                `[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
                object
            )
        } else {
            console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`)
        }
    },

    error: (namespace, message, object) => {
        if (object) {
            console.error(
                `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
                object
            )
        } else {
            console.error(
                `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`
            )
        }
    },

    debug: (namespace, message, object) => {
        if (object) {
            console.debug(
                `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
                object
            )
        } else {
            console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`)
        }
    }
}

module.exports = logging
