const licenseRouter = require("express").Router();
const { getLicenses, getLincense, createLicense, renewLicense, disableLicense, getLincenseByOwnerId } = require("../controllers/LicenseController");

licenseRouter.get('/', getLicenses)

licenseRouter.get('/:id', getLincenseByOwnerId)

licenseRouter.post("/", createLicense)

licenseRouter.patch("/update/:id", renewLicense)

licenseRouter.delete("/disable/:id", disableLicense)


module.exports = licenseRouter