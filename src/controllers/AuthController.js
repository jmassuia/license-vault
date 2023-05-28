const connection = require('../migrations/connection');
const bcrypt = require('bcrypt');
const MailerService = require("../services/nodemailer");
const MailtrapService = require("../services/mailTrap");


module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({
                message: 'Missing user or password.'
            });
        }

        const [user] = await connection
            .from('Users')
            .where({ email }).select("id", "password");

        if (!user) {
            return res.status(500).json({
                message: 'User does not exist!'
            })
        }

        //Compare pass
        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(500).json({
                message: 'Email or password inconsistent or register does not exist.'
            })
        }

        res.status(200).json({
            data: user.id
        })
    },
    async signUp(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(500).json({
                message: "Please, provide the data required in the form to create an account!"
            })
        }

        //encrypt password
        const hashed = await bcrypt.hash(password, 10);

        await connection('Users').insert({
            name,
            email,
            password: hashed
        });

        res.status(201).json({
            message: "User has been created",
        })
    },
    async resetPassword(req, res) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed).toUTCString();

        //to do - Implement Token validation through email - JWT
        const { email, newPassword } = req.body;
        const [isValidEmail] = await connection("Users").where({ email }).select("email");

        console.log(isValidEmail);
        if (!isValidEmail) {
            return res.status(500).json({
                message: "Please, provide valid email address!"
            })
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await connection('Users').where({ email }).update({
            password: hashed,
            passwordResetAt: today
        });

        //Send email mailtrap testing
        // const mailService = new MailerService();
        // mailService.sendMail(email, "Lkeeper - Password Reset Notification", `Your password was reset at ${today}`);

        //Send email sending
        const mailService = new MailtrapService();
        mailService.sendMail(isValidEmail.email, "Lkeeper - Password Reset Notification", `Your password was reset at ${today}`);

        res.status(200).json({
            message: 'Your password was reset.'
        })
    }
}