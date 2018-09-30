let express = require('express');
let router = express.Router();
let auth = require('../helpers/auth')
var verify = require('../middleware/verifyToken');


let user = require("../services/user/user.controller");


router.get('/categoryList', user.categoryList);
router.get('/productList', user.productList);
router.post('/addEnquiry', user.addEnquiry);
// router.post('/login', user.login);
// router.post('/bookOrder', verify.verifyUserToken, user.bookOrder);
// router.post('/cancelOrder', user.cancelOrder);



module.exports = router;