const { MailtrapClient } = require("mailtrap");

class MailtrapService {
    constructor() {
        this.token = process.env.MAILTRAP_CLIENT_TOKEN;
        this.endpoint = process.env.MAILTRAP_CLIENT_ENDPOINT;
        this.sender = {
            email: process.env.MAILTRAP_CLIENT_SENDERMAIL,
            name: process.env.MAILTRAP_CLIENT_SENDERNAME
        }

        this.client = new MailtrapClient({ endpoint: this.endpoint, token: this.token });
    }

    async sendMail(recipients, subject, text) {
        await this.client.send({
            from: this.sender,
            to: [{ email: recipients }],
            subject: subject,
            text: text,
            category: "Integration Test",
        }).then(console.log, console.error);
    }
}

module.exports = MailtrapService;