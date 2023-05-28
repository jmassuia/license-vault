const nodemailer = require('nodemailer');

class MailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASS
            }
        });
    }

    sendMail(email, subject, text) {
        const mailOptions = {
            from: 'joaomassuia@tech.com',
            to: email,
            subject: subject,
            text: text
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

module.exports = MailerService;
