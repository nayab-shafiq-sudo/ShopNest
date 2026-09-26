const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000
        })

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to,
            subject,
            text
        })

        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error.message)
    }
}

module.exports = sendEmail