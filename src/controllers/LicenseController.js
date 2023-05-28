const connection = require('../migrations/connection');

module.exports = {
    async getLicenses(req, res) {
        //List all Licenses from this user id
        const allLicenses = await connection('Licenses').select('*');

        res.status(200).json({
            data: allLicenses
        })
    },
    async getLincense(req, res) {
        //Get License id
        const { id } = req.params;

        //List all Licenses from this user id
        const License = await connection('Licenses').where({ id: id }).select('*');

        res.status(200).json({
            data: License
        })
    },
    async getLincenseByOwnerId(req, res) {
        //Get License id
        const { id } = req.params;

        //List all Licenses from this user id
        const License = await connection('Licenses').where({ ownerId: id }).select('*');

        res.status(200).json({
            data: License
        })
    },
    async createLicense(req, res) {
        const date = new Date(Date.now()).toUTCString();

        //Get body info
        const { ownerId, productName, productToken, expireAt } = req.body;
        console.log(productName)
        //Store on DB
        await connection('Licenses').insert({
            ownerId,
            productName,
            productToken,
            createdAt: date,
            expireAt,
            isDisabled: false
        });

        //Return
        res.status(201).json({
            message: "License created successfully"
        })
    },
    async renewLicense(req, res) {
        const date = new Date(Date.now()).toUTCString();

        const { id } = req.params;
        const { expireAt } = req.body;

        //Update License
        await connection('Licenses').where({ id: id }).update({
            renewAt: date,
            expireAt
        });

        //Return
        res.status(200).json({
            message: "License renewed successfully"
        })
    },
    async disableLicense(req, res) {
        const { id } = req.params;

        await connection('Licenses').where({ id }).update({
            isDisabled: true
        });

        res.status(200).json({
            messsage: "License was disabled!"
        })
    }
}