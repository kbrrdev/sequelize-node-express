const express = require('express')
const config = require('./configs/config')
const logging = require('../core/utils/logging')
const logger = require('../core/middlewares/logger')
const errorHandler = require('../core/middlewares/errorHandler')
const notFound = require('../core/middlewares/notFound')
const customResponses = require('../core/middlewares/customResponses')
const routes = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { sequelize } = require('./models')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(logger)
app.use(customResponses.handler)

app.use('/api', routes)

app.use(errorHandler)
app.use(notFound)

app.listen(config.PORT, async () => {
    logging.info('Server Start', `Server running on ${config.PORT}`)

    try {
        await sequelize.authenticate()
        logging.info('Sequelize', 'Database connected!')
    } catch (error) {
        logging.error('Sequelize', '', error)
    }
})
