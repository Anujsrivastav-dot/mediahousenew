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


router
    .route('/designation')
    .post(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addDesignation)
   




module.exports = router;