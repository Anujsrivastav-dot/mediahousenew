let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')



let admin = require("../services/admin.service");

router.post('/addCategory',admin.addCategory);
router.post('/updateCategory',admin.updateCategory);
router.post('/deleteCategory',admin.deleteCategory);   
router.get('/getCategoryList',admin.getCategoryList);


router.post('/addProduct',admin.addProduct);
router.post('/updateProduct',admin.updateProduct);
router.post('/deleteProduct',admin.deleteProduct);   
router.get('/getProductList',admin.getProductList);

router.post('/enquiry',admin.enquiry);
router.get('/getEnquiryList',admin.getEnquiryList);

router.post('/paginate',admin.paginate);


module.exports = router;