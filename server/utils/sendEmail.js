const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email', error)
    }
}

module.exports = sendEmail