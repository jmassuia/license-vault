const userRouter = require('express').Router();
const { login, signUp, resetPassword } = require('../controllers/AuthController');

//Login
userRouter.post('/login', login);
//Sign up
userRouter.post('/signup', signUp);
//ResetPassword
userRouter.patch('/reset', resetPassword);

module.exports = userRouter;
