require('dotenv').config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 5000,

    // jsonwebtoken
    JWT_ACCESS_TOKEN:
        process.env.JWT_ACCESS_TOKEN || 'hsM518arOoYL9ASQLopkZ5socc7JL4Cs',
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE || 15,
    JWT_REFRESH_TOKEN:
        process.env.JWT_REFRESH_TOKEN || 'x8Xskidk1LffjtPHXpNIJBBvdlmy72d9',
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || 30,

    // database credentials
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,

    PUBLIC_URL: process.env.PUBLIC_URL
}
