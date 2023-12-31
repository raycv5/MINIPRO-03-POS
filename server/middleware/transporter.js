const nodemailer = require('nodemailer')

const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports= transpoter