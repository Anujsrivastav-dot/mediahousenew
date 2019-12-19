// npm package dependacny
let express = require('express');
let router = express.Router();

// authentication function 
let auth = require('../middleware/auth')


// admin services
let admin = require("../services/admin.service");


// router.post('/login', admin.login);
// // add category api route
// router.post('/addCategory', admin.addCategory);
// // update category api route


// router
//     .route('/admin/cart')
//     .post(admin.addToCart)
//     .get(admin.getCartList)




module.exports = router;