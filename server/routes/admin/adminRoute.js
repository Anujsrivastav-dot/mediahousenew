let express = require('express');
let router = express.Router();
let validate = require('../../middleware/validation')

//express validation function to throw validation
const {
    check,
    validationResult
} = require('express-validator/check');
// authentication function 
let auth = require('../../middleware/auth');
let config = require('../../helpers/config')();
const sendRes = require("../../helpers/responseHandler");


// check validation result
function checkValidationResult(req, res, next) {
    var result = validationResult(req).array();
    console.log(result)
    result.length ? sendRes.to_user(res, 403, result[0].msg) : next()
}


// admin services
let admin = require("../../services/admin/admin.service");


// router.post('/login', admin.login);
// // add category api route
// router.post('/addCategory', admin.addCategory);
// // update category api route

//router for designation
router
    .route('/designation')
    .post(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addDesignation)

    .get( admin.getDesignation)

    .put(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateDesignation)

    .delete(admin.deleteDesignation)

//router for benifit    
    router
    .route('/benefit')
    .post(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addBenefit)

    .get( admin.getBenefit)

    .put(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateBenefit)

    .delete(admin.deleteBenefit)

//router for benifit  of platform  
    router
    .route('/benefit')
    .post(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addBenefit)

    .get( admin.getBenefit)

    .put(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateBenefit)

    .delete(admin.deleteBenefit)    

//router for category    
    router
    .route('/category')
    .post(validate.categoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addCategory)

    .get( admin.getCategory)

    .put(validate.categoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateCategory)

    .delete(admin.deleteCategory)


module.exports = router;