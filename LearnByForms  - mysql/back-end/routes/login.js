const express = require('express');

const  LoginController = require('../controllers/login')
const  TokenController = require('../controllers/token')
const router = express.Router();


router.post('/', LoginController.login);
router.post('/logout', LoginController.logout);
router.post('/register', LoginController.register);
router.post('/auth', LoginController.auth);
router.post('/callback', LoginController.callback);
router.post('/profile', LoginController.profile);
router.post('/addProfile', LoginController.addProfile);
router.post('/refreshToken', TokenController.renewToken);



module.exports = router;