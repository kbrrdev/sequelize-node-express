module.exports = {
    generateRandomString: (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let token = ''

        for (let i = 0; i < length; i++) {
            token += characters.charAt(
                Math.floor(Math.random() * characters.length)
            )
        }

        return token
    }
}
