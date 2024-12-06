const express = require('express');

const  HomeController = require('../controllers/home')

const router = express.Router();

// /admin/add-product => GET
//router.get('/create', CrudController.navigate);
//console.log("login")
// /admin/add-product => POST
router.post('/', HomeController.home);
router.post('/home_data', HomeController.homedata);
router.post('/review_data', HomeController.reviewdata);
router.post('/reviewdata', HomeController.reviewData);
//router.post('/RegData', LoginController.Register);
module.exports = router;