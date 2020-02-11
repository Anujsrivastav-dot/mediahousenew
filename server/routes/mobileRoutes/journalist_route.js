let express = require("express");
let router = express.Router();
let validate = require("../../middleware/validation");
var multer = require("multer");
const sendResponse = require("../../helpers/responseHandler");
//!!!!!!express validation function to throw validation...........
const { check, validationResult } = require("express-validator/check");
//!!!!!!!!! authentication function................................
let auth = require("../../helpers/auth");
let config = require("../../helpers/config")();
const sendRes = require("../../helpers/responseHandler");

// ==============================
// check validation result
// ==============================
function checkValidationResult(req, res, next) {
  var result = validationResult(req).array();
  console.log(result);
  result.length ? sendRes.to_user(res, 403, result[0].msg) : next();
}

let journalistService = require("../../services/mobileServices/journalist");
let myContentService = require("../../services/journalist/myContent.service");
let enquiryService = require("../../services/journalist/enquiry.service");

// ==============================
// multer function for file upload
// ==============================
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

// ==============================
// routes for journalist signup
// ==============================

router.route("/personalInfo").post(
  cpUpload,
  validate.personalReq,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.personalInfo
);

router.route("/professionalDetails").put(
  Upload,
  validate.professionalDetails,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.professionalDetails
);
router.route("/refrences").put(
  validate.refrences,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.refrences
);
router.route("/previousWorks").put(
  validate.previousWorks,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.previousWorks
);

router.route("/socialAccountLinks").put(
  validate.socialAccountLinks,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.socialAccountLinks
);

router.route("/platformBenefits").put(
  validate.platformBenefit,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.platformBenefits
);
// ==============================
// routes for Country state city
// ==============================

router.route("/country").get(function(req, res) {
  var data = require("../../helpers/country");
  sendResponse.to_user(res, 200, null, "country list fetch successfully", data);
});

router.route("/states").get(journalistService.state);

router.route("/city").get(journalistService.city);

// ==============================
// routes for Login
// ==============================
router.route("/login").post(
  validate.jLoginReq,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  journalistService.journalistLogin
);
// ==============================
// routes for forgot password
// ==============================
router.route("/forgotPassword").post(journalistService.forgotPassword);

router.route("/verifyOtp").post(journalistService.verifyOtp);

router.route("/resetPassword").post(journalistService.resetPassword);

// ==============================
// routes for content upload
// ==============================

router
  .route("/uploadContent")
  .post(
    uploadImg.array("myContent", 12),
    auth.authenticateJournalist,
    myContentService.myContent
  )
  .get(auth.authenticateJournalist, myContentService.getMyContent)
  .put(auth.authenticateJournalist, myContentService.updatemyContent)
  .delete(auth.authenticateJournalist, myContentService.deleteMyContent);
// ==============================
//  routes for  Enquiry
// ==============================
router
  .route("/enquiry")
  .post(
    validate.enquiryReq,
    (req, res, next) => {
      checkValidationResult(req, res, next);
    },
    auth.authenticateJournalist,
    enquiryService.addEnquiry
  )
  .get(auth.authenticateJournalist, enquiryService.getEnquiry);

// ==============================
//  routes for  story sell and blog
// ==============================
router
  .route("/blog")
  .post(
    validate.blog,
    (req, res, next) => {
      checkValidationResult(req, res, next);
    },
    auth.authenticateJournalist,
    journalistService.blog
  )
  .put(blogUpload, auth.authenticateJournalist, journalistService.uploadBlog);
router
  .route("/sellStory")
  .post(
    validate.story,
    (req, res, next) => {
      checkValidationResult(req, res, next);
    },
    auth.authenticateJournalist,
    journalistService.sellStory
  )
  .put(blogUpload, auth.authenticateJournalist, journalistService.uploadStory);
router
  .route("/getJournalistProfile")
  .get(auth.authenticateJournalist, journalistService.getProfile);
router
  .route("/getAllJournalist")
  .get(auth.authenticateJournalist, journalistService.getAllJournalist);
router
  .route("/getStory")
  .get(auth.authenticateJournalist, journalistService.getStory);
router
  .route("/countStory")
  .get(auth.authenticateJournalist, journalistService.countStory);
router
  .route("/getSaveStory")
  .get(auth.authenticateJournalist, journalistService.getSaveStory);
router
  .route("/getMyStory")
  .get(auth.authenticateJournalist, journalistService.getMyStory);
router.route("/favouriteStory").post(
  validate.favouriteStory,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  auth.authenticateJournalist,
  journalistService.favouriteStory
);
module.exports = router;
