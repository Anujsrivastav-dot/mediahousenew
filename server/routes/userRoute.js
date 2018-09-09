// Require the package 
let express = require('express');
let router = express.Router();
let auth = require('../helpers/auth')



let user = require("../services/user.service");


router.post('/signup', user.signup);
router.post('/addOrder',user.addOrder);
router.post('/deleteOrder',user.deleteOrder);



module.exports = router;