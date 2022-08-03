const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            type: 'OAUTH2',
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    })
    transporter.verify((error, success)=>{
        error ? console.log(error) : console.log(`Server is ready to take messages: ${success}`)
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;