let express = require('express');
let router = express.Router();
let validate = require('../../middleware/validation')
const sendResponse = require("../../helpers/responseHandler");
var multer = require('multer');
var async = require("async")
var verifyAdmin = require("../../helpers/auth")
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(req.body)
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        var fileName = Date.now() + '_' + file.originalname;
        callback(null, fileName)
    }
});
var upload = multer({ storage: storage });

const {
    check,
    validationResult
} = require('express-validator/check');
// authentication function 
let auth = require('../../middleware/auth');
let verify = require('../../middleware/verifyToken');
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
let content = require("../../services/admin/staticContent.service");

//var cpUpload = upload.fields([{ name: 'video', maxCount: 8 }, { name: 'file', maxCount: 8 }])
router
    .route('/admin')
    .post(admin.add)
    .get(admin.get, verify.verifyUserToken);
router.route("/login").post(
    validate.adminLoginReq,
    (req, res, next) => {
        checkValidationResult(req, res, next);
    },
    admin.adminLogin
);
//JOURNALIST DETAILS
router.route("/getJernalistDetails/:id")
.get(verifyAdmin.authenticateAdmin,admin.journalistDetailsById)

//GET ALL JOURNALIST DETAILS
router.route("/getAllJournalist")
.get(verifyAdmin.authenticateAdmin,admin.getJournalistlist)
//JOURNALIST SEARCH API
router.route("/SearchJournalist")
.get(verifyAdmin.authenticateAdmin,admin.JournalistSearch)
//router for designation
router
    .route('/designation')
    .post(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addDesignation)

    .get(admin.getDesignation)

    .put(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateDesignation)

    .delete(admin.deleteDesignation)

router
    .route('/benefit')
    .post(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addBenefit)

    .get(admin.getBenefit)

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

    .get(admin.getCategory)

    .put(validate.categoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateCategory)

    .delete(admin.deleteCategory)

//router for story category    
router
    .route('/storyCategory')
    .post(validate.storyCategoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryCategory)

    .get(admin.getStoryCategory)

    .put(validate.storyCategoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryCategory)

    .delete(admin.deleteStoryCategory)

//router for story type    
router
    .route('/storyType')
    .post(validate.storyTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryType)

    .get(admin.getStoryType)

    .put(validate.storyTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryType)

    .delete(admin.deleteStoryType)

//router for story  Keyword     
router
    .route('/storyKeyword')
    .post(validate.storyKeywordReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryKeyword)

    .get(admin.getStoryKeyword)

    .put(validate.storyKeywordReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryKeyword)

    .delete(admin.deleteStoryKeyword)

    //router for keyword list for web  
router
    .route("/keyword").get(admin.getStoryKeywordForWeb)
//router for list of journalist  
router
    .route('/journalist')
    .get(admin.getJournalist)
    .put(validate.journalistReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateJournalist)

//router for static content 

router
    .route('/staticContent')
    .get(content.getContent)
    .put(content.updateContent)

//router for story  Keyword     
router
    .route('/socioLinks')
    .post(validate.socioLinkReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addSocioLinks)

    .get(admin.getSocioLinks)

    .put(validate.socioLinkReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateSocioLinks)

    .delete(admin.deleteSocioLinks)

    //Language List
    router.route("/languageLists").get(function (req, res) {
         finalArray = [];
        var data = require("../../helpers/language");
        for (var i = 0; i < data.length; i++) {
            this.finalArray.push({"id":data[i].lang_id,"text":data[i].lang_name})
          }
        sendResponse.to_user(res, 200, null, "language list fetch successfully", finalArray);
      });
//router for mediahouseType 
router
    .route('/mediahouseType')
    .post(validate.mediahouseTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addMediahouseType)

    .get(admin.getMediahouseType)

    .put(validate.mediahouseTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateMediahouseType)

    .delete(admin.deleteMediahouseType)  
  //router for mediahouseType for web 
 
router.route("/media-house-type")
    .get(admin.getMediahouseTypeForWeb)
//router for mediahouseType 
router
    .route('/mediahouseFrequency')
    .post(validate.mediahouseFrequencyReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addMediahouseFrequency)

    .get(admin.getMediahouseFrequency)

    .put(verifyAdmin.authenticateAdmin,validate.mediahouseFrequencyReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateMediahouseFrequency)

    .delete(verifyAdmin.authenticateAdmin,admin.deleteMediahouseFrequency)   
      //router for mediahouse frequency for web 

    router.route("/media-house-frequency")
    .get(verifyAdmin.authenticateAdmin,admin.getMediahouseFrequencyForWeb)

    router.route("/setkeyword")
   .post(admin.storykeyword)

   //MEDIA HOUSE LIST API
    router.route("/getMediahouselist")
    .get(verifyAdmin.authenticateAdmin,admin.getMediahouselist)
//CHANGEPASSWORD
router.route("/change-password")
.put(verifyAdmin.authenticateAdmin,validate.changePasswordReq,(req,res,next)=> {
    checkValidationResult(req,res,next);
},admin.changePassword);
//BLOCK/UNBLOCK API
    router.route("/block")
    .put(verifyAdmin.authenticateAdmin,admin.updateStatus)

    //STORY LIST
    router.route("/getStory")
    .get(verifyAdmin.authenticateAdmin,admin.StorySearch)
//FAQ API
router.route("/Faq")
.post(verifyAdmin.authenticateAdmin,validate.faqvalidation,(req,res,next)=> {
    checkValidationResult(req,res,next);
},admin.FAQ)
//CONTACT US API
router.route("/contactUs")
.post(verifyAdmin.authenticateAdmin,validate.contactUsReq,(req,res,next)=> {
    checkValidationResult(req,res,next);
},admin.contactUs)

//UPDATE ADMIN PROFILE
router.route("/updateProfile")
.put(verifyAdmin.authenticateAdmin,upload.single("file"),admin.updateProfileReq)
//DELETE FAQ
router.route("/deleteFaq")
.delete(verifyAdmin.authenticateAdmin,admin.deleteFaq)
//UPDATEFAQ

router.route("/updateFaq")
.put(verifyAdmin.authenticateAdmin,admin.updateFaq)
//STORY SEARCH
router.route("/storyFilter")
.get(verifyAdmin.authenticateAdmin,admin.StorySearch)

router.route("/transactionHistory")
.get(verifyAdmin.authenticateAdmin,admin.transactionHistory)
module.exports = router;