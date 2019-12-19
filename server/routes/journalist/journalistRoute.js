let express = require('express');
let router = express.Router();
let validate = require('../middleware/validation')
const {
    check,
    validationResult
} = require('express-validator/check');
// authentication function 
let auth = require('../middleware/auth');
let config = require('../helpers/config')();
const sendRes = require("../helpers/responseHandler");


// check validation result
function checkValidationResult(req, res, next) {
    var result = validationResult(req).array();
    result.length ? sendRes.toUser(req, res, 403, result[0].msg) : next()
}

let service = require("../services/journalist/journalist");

// let service = require("../services/service");
// let content = require("../services/staticContent");
// let admin = require("../services/admin");
// let offer = require("../services/offer");
// let inventory = require("../services/inventory");
// let vendor = require("../services/vendor");


//* admin Routing goes here *//
router
    .post('/login', validate.adminLoginReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.adminLogin)
    
router
    .post('/customerDetails', auth.authenticateAdmin, admin.customerDetails)
    .put('/updateCustomerProfile', validate.customerUpdateReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, auth.authenticateAdmin, admin.updateCustomerProfile)

router
    .route('/faq')
    .post(auth.authenticateAdmin, content.addFaq)
    .put(auth.authenticateAdmin, content.updateFaq)
    .get(auth.authenticateAdmin, content.faqList)

//* offer Routing goes here *//


module.exports = router;