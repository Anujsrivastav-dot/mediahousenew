// Require the package 
let express = require('express');
let router = express.Router();
let auth = require('../helpers/auth')
var verify=require('../middleware/verifyToken');



let user = require("../services/user.service");


router.post('/signup',user.signup);
router.post('/login',user.login);
router.post('/addOrder',verify.verifyUserToken,user.addOrder);
router.post('/deleteOrder',user.deleteOrder);



module.exports = router;