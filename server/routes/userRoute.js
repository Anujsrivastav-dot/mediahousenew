let express = require('express');
let router = express.Router();
let auth = require('../helpers/auth')
var verify = require('../middleware/verifyToken');


let user = require("../services/user/user.controller");


router
    .get('/categoryList', user.categoryList)
    .get('/productList', user.productList)
    .post('/addEnquiry', user.addEnquiry)
    .post('/register', user.register)
    .post('/login', user.login)
    .post('/forgotPassword', user.forgotPassword)




// router.post('/login', user.login);
// router.post('/bookOrder', verify.verifyUserToken, user.bookOrder);
// router.post('/cancelOrder', user.cancelOrder);



module.exports = router;