// npm package dependacny
let express = require('express');
let router = express.Router();

// authentication function 
let auth = require('../middleware/auth')


// admin service 
let admin = require("../services/admin.service");


router.post('/login', admin.login);
// add category api route
router.post('/addCategory', admin.addCategory);
// update category api route
router.put('/updateCategory/:categoryId', admin.updateCategory);
// delete category api route
router.put('/deleteCategory/:categoryId', admin.deleteCategory);
router.post('/categoryList', admin.categoryList);
router.get('/allCategoryList', admin.allCategoryList);

// get category list api route
router.post('/productList', admin.productList);
// add product api route
router.post('/addProduct', admin.addProduct);
// update product api route
router.put('/updateProduct/:productId', admin.updateProduct);
// delete product api route
router.put('/deleteProduct/:productId', admin.deleteProduct);
// get product api route   
//router.get('/productList', admin.productList);
// save enquiry api route
router.post('/enquiry', admin.enquiry);
router.post('/updateEnquiryStatus', admin.updateEnquiryStatus);
// get enquiry list api route
router.post('/enquiryList', admin.enquiryList);

router.post('/userList', admin.userList);

// 
router.post('/paginate', admin.paginate);


module.exports = router;