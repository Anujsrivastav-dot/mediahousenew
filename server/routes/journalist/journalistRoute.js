let express = require("express");
let router = express.Router();
let validate = require("../../middleware/validation");
var multer = require("multer");
const sendResponse = require("../../helpers/responseHandler");
//express validation function to throw validation
const { check, validationResult } = require("express-validator/check");
// authentication function
let auth = require("../../middleware/auth");
let config = require("../../helpers/config")();
const sendRes = require("../../helpers/responseHandler");

// check validation result
function checkValidationResult(req, res, next) {
  var result = validationResult(req).array();
  console.log(result);
  result.length ? sendRes.to_user(res, 403, result[0].msg) : next();
}

let journalistService = require("../../services/journalist/journalist.service");
let myContentService = require("../../services/journalist/myContent.service");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //   console.log(req.file)
    callback(null, "images");
  },
  filename: function (req, file, callback) {
    var fileName = Date.now() + "_" + file.originalname;
    callback(null, fileName);
  }
});
var uploadImg = multer({ storage: storage });

router.route("/journalistSignup").post(
  uploadImg.single("profilePic"),
  validate.journalistReq,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.signupJournalist
);

router.route("/country").get(function (req, res) {
  finalArray = [];
  var data = require("../../helpers/country");
  for (var i = 0; i < data.length; i++) {
    this.finalArray.push({ id: data[i].id, text: data[i].name, currencyName: data[i].currencyName, currencySymbol: data[i].symbol })
  }
  // response.userMessage = "list of cities";
  sendResponse.to_user(res, 200, null, "country list fetch successfully", finalArray);
});

router.route("/states").get(journalistService.state);

router.route("/city").get(journalistService.city);

router.route("/login").post(
  validate.jLoginReq,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.journalistLogin
);

router.route("/forgotPassword").post(journalistService.forgotPassword);

router
  .route('/verifyOtp')
  .post(journalistService.verifyOtp)

router
  .route('/resetPassword')
  .post(journalistService.resetPassword)

// offer Routing goes here //

router.route("/uploadMyContent").post(
  uploadImg.array('myContent', 12),
  myContentService.myContentService
);
// offer Routing goes here //

module.exports = router;
