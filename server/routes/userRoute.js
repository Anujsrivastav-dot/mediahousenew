// Require the package 
let express = require('express');
let router = express.Router();
// require token authentication file
let auth = require('../helpers/auth')
var verify = require('../middleware/verifyToken');


// user api services
let user = require("../services/user.service");


// singup api route
router.post('/signup', user.signup);
// login api route
router.post('/login', user.login);
// add order api route
router.post('/bookOrder', verify.verifyUserToken, user.bookOrder);
// cancle order api route
router.post('/cancelOrder', user.cancelOrder);



module.exports = router;