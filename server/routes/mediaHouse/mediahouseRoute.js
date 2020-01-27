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

let mediahouseService = require("../../services/mediaHouse/mediahouse.service");
let myContentService = require("../../services/journalist/myContent.service");
let enquiryService = require("../../services/journalist/enquiry.service");


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images");
  },
  filename: function (req, file, callback) {
    var fileName = Date.now() + "_" + file.originalname;
    callback(null, fileName);
  }
});
var uploadImg = multer({ storage: storage });
var cpUpload = uploadImg.fields([{ name: 'profilePic', maxCount: 8 }, { name: 'logo', maxCount: 8 }])
var Upload = uploadImg.single('uploadResume')

//============journalist signup api ===========

router.route("/personalInformation").post(cpUpload,validate.mediahousePersonalReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
mediahouseService.personalInformation
);

router.route("/companyInformation").put(validate.companyInformationReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  mediahouseService.companyInformation
);

router.route("/socialAccountLink").put(validate.mediahouseSocialAccountLinks, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  mediahouseService.socialAccountLink
);
//============County List==============
router.route("/country").get(function (req, res) {
  finalArray = [];
  var data = require("../../helpers/country");
  for (var i = 0; i < data.length; i++) {
    this.finalArray.push({ id: data[i].id, text: data[i].name, currencyName: data[i].currencyName, currencySymbol: data[i].symbol })
  }
  // response.userMessage = "list of cities";
  sendResponse.to_user(res, 200, null, "country list fetch successfully", finalArray);
});

//=============Language List=============
router.route("/languages").get(function (req, res) {
  var data = require("../../helpers/language");
  sendResponse.to_user(res, 200, null, "language list fetch successfully", data);
});
//=============State list=============

router.route("/states").get(mediahouseService.state);

//=============City list=============

router.route("/city").get(mediahouseService.city);

//=============Journalist Login=============

router.route("/login").post(
  validate.jLoginReq,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  mediahouseService.journalistLogin
);

router.route("/forgotPassword").post(mediahouseService.forgotPassword);

router
  .route('/verifyOtp')
  .post(mediahouseService.verifyOtp)

router
  .route('/resetPassword')
  .post(mediahouseService.resetPassword)

// Api for content upload//

  router
  .route("/uploadContent")
  .post(
    uploadImg.array('myContent', 12),
    myContentService.myContent
  )
  .get(myContentService.getMyContent)
  .put(myContentService.updatemyContent)

// Api for Enquiry // 
router
  .route("/enquiry")
  .post(validate.enquiryReq,
    (req, res, next) => {
      checkValidationResult(req, res, next);
    },
    enquiryService.addEnquiry
  )
  .get(enquiryService.getEnquiry)



module.exports = router;
