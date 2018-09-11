// npm package dependacny
let express = require('express');
let router = express.Router();

// authentication function 
let auth = require('../middleware/auth')


// admin service 
let admin = require("../services/admin.service");


//router.post('/login', admin.login);
// add category api route
router.post('/addCategory', admin.addCategory);
// update category api route
router.post('/updateCategory', admin.updateCategory);
// delete category api route
router.post('/deleteCategory', admin.deleteCategory);
// get category list api route
router.get('/productList', admin.productList);
// add product api route
router.post('/addProduct', admin.addProduct);
// update product api route
router.post('/updateProduct', admin.updateProduct);
// delete product api route
router.post('/deleteProduct', admin.deleteProduct);
// get product api route   
router.get('/productList', admin.productList);
// save enquiry api route
router.post('/enquiry', admin.enquiry);
// get enquiry list api route
router.get('/enquiryList', admin.enquiryList);
// 
router.post('/paginate', admin.paginate);


module.exports = router;