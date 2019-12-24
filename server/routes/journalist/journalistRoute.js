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

let journalistService = require("../../services/journalist/journalist.service");

// let service = require("../services/service");
// let content = require("../services/staticContent");
// let admin = require("../services/admin");
// let offer = require("../services/offer");
// let inventory = require("../services/inventory");
// let vendor = require("../services/vendor");


//* Service Routing goes here *//

router
.route('/signup')
    .post(journalistService.signupJournalist)

//* offer Routing goes here *//


module.exports = router;