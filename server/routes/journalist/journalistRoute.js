let express = require("express");
let router = express.Router();
let validate = require("../../middleware/validation");
var multer = require("multer");
const sendResponse = require("../../helpers/responseHandler");
//express validation function to throw validation
const { check, validationResult } = require("express-validator/check");
// authentication function
let auth = require("../../helpers/auth");
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
var cpUpload = uploadImg.fields([{ name: 'profilePic', maxCount: 8 }, { name: 'shortVideo', maxCount: 8 }])
var Upload = uploadImg.single('uploadResume')



// =====================================
// multer function for blog/doc upload
// =====================================
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    //   console.log(req.file)
    callback(null, "images");
  },
  filename: function(req, file, callback) {
    var fileName = Date.now() + "_" + file.originalname;
    callback(null, fileName);
  }
});
var uploadImg = multer({ storage: storage });
var cpUpload = uploadImg.fields([
  { name: "profilePic", maxCount: 8 },
  { name: "shortVideo", maxCount: 8 }
]);
var blogUpload = uploadImg.fields([
  { name: "uploadTexts", maxCount: 8 },
  { name: "uploadImages", maxCount: 8 },
  { name: "uploadVideos", maxCount: 8 },
  { name: "uploadThumbnails", maxCount: 8 },
  { name: "supportingDocs", maxCount: 8 },
  { name: "uploadAudios", maxCount: 8 }
]);
var Upload = uploadImg.single("uploadResume");

//============journalist signup api ===========

router.route("/personalInformation").post(cpUpload,validate.journalistReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.personalInformation
);

router.route("/professionalDetail").put(Upload,validate.professionalDetailsReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.saveProfessionalDetails
);
router.route("/refrence").put(validate.refrencesReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.saveRefrences
);
router.route("/previousWork").put(validate.previousWorksReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.savePreviousWork
);

router.route("/socialAccountLink").put(validate.socialAccountLinksReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.saveSocialAccountLink
);

router.route("/platformBenefit").put(validate.platformBenefitReq, (req, res, next) => {
  checkValidationResult(req, res, next)
},
  journalistService.savePlatformBenefits
);
router
  .route("/blog-post")
  .post(
    validate.blogReq,
    (req, res, next) => {
      checkValidationResult(req, res, next);
    },
    auth.authenticateJournalist,
    journalistService.blog
  )
  router
  .route("/upload-blog-doc")
  .put(blogUpload, auth.authenticateJournalist, journalistService.uploadBlogs);

 
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

router.route("/states").get(journalistService.state);

//=============City list=============

router.route("/city").get(journalistService.city);
//=============Journalist Login=============

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

  // Api for get stories // 
  router
  .route("/get-stories")
  .get(auth.authenticateJournalist, journalistService.getStory);


module.exports = router;
