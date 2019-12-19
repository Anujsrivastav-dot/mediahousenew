const {
    check,
    oneOf
} = require('express-validator/check');

var checkEmail = [
        check('emailId', 'EmailId is required').exists(), check('emailId', 'Invalid email address').isEmail()
    ],
    
    //=========================================//
    firstName = [check('firstName', 'firstName is required').exists().not().isEmpty().withMessage("firstName cannot be empty")],
    middleName = [check('middleName', 'middleName is required').exists().not().isEmpty().withMessage("middleName cannot be empty")],
    lastName = [check('lastName', 'lastName is required').exists()],
    mobileNumber = [check('mobileNumber', 'MobileNumber is required').exists().not().isEmpty().withMessage("mobileNumber cannot be empty")],
    country = [check('country', 'country is required').exists()],
    state = [check('state', 'state is required').exists()],
    city = [check('city', 'city is required').exists()],
    pinCode = [check('pinCode', 'pinCode is required').exists()],
    shortBio = [check('shortBio', 'shortBio is required').exists()],
    password = [check('password', 'Password is required').exists().not().isEmpty().withMessage("password cannot be empty")],
    areaOfInterests = [check('areaOfInterests', 'areaOfInterest is required').exists().not().isEmpty().withMessage("areaOfInterest cannot be empty")],
    targetAudiences = [check('targetAudiences', 'targetAudiences is required').exists().not().isEmpty().withMessage("targetAudiences cannot be empty")],
    resumeDetail = [check('resumeDetail', 'resumeDetail is required').exists()],
    refrences = [
        check('firstName', 'firstName is required').exists().not().isEmpty().withMessage("firstName cannot be empty"),
        check('middleName', 'middleName is required').exists().not().isEmpty().withMessage("middleName cannot be empty"),
        check('lastName', 'lastName is required').exists().not().isEmpty().withMessage("lastName cannot be empty"),
        check('designation', 'designation is required').exists().not().isEmpty().withMessage("designation cannot be empty"),
        check('lastName', 'lastName is required').exists().not().isEmpty().withMessage("lastName cannot be empty"),
        check('mobileNumber', 'mobileNumber is required').exists().not().isEmpty().withMessage("mobileNumber cannot be empty"),

    ],


var validateObj = {};
validateObj.signUpReq = [...checkEmail, ...password];
validateObj.adminLoginReq = [...checkEmail, ...password];


module.exports = validateObj;