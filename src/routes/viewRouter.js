const { login } = require('../controllers/AuthController');
const connection = require('../migrations/connection');

const viewRouter = require('express').Router();

viewRouter.get('/', (req, res) => {
    res.render('index');
})

viewRouter.get('/signup', (req, res) => {
    res.render('signUp', { filterNavItems: "signup" });
})

viewRouter.get('/login', (req, res) => {
    res.render('login', { filterNavItems: ["login"] });
})

viewRouter.get('/reset', (req, res) => {
    res.render('reset', { filterNavItems: ["signup", "login"] });
})

viewRouter.get('/licenses/:id', async (req, res) => {
    //Get License id
    const { id } = req.params;

    //List all Licenses from this user id
    const License = await connection('Licenses').where({ ownerId: id, isDisabled: false }).select('*');

    res.render('licensesList', { filterNavItems: ["signup", "login"], License });
})



module.exports = viewRouter;
