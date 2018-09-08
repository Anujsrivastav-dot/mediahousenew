// Require the package 
let express = require('express');
let router = express.Router();
let auth = require('../helpers/auth')



let web = require("../services/web.service");


//router.post('/userList', auth.authenticateAdmin, user.userList);



module.exports = router;