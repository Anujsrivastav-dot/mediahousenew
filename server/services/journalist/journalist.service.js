const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const encryptDecrypt = require("../../helpers/cryptoPassword");
const generateToken = require("../../helpers/generateAuthToken");
// var mailFunction = require("../../lib/mailer");
var randomOtp = require('random-number');
var nodemailer = require('nodemailer');
var random = require('random-number-generator')

randomOtp();

// const COUNTRIES =require("../../helpers/country");
const STATES = require("../../helpers/state");
const CITY = require("../../helpers/city");
module.exports = {
  signupJournalist: async (req, res) => {
    //console.log(req.body.platformBenefits.split());
    try {
      var newFileName = req.file.filename;
      var condition = {
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber
      };
      var success = await db.journalist.findOne(condition);
      if (success) {
        console.log("success", success);
        sendResponse.to_user(
          res,
          409,
          "DATA_ALREADY_EXIST",
          "Email id already taken",
          null
        );
      } else {
        req.body.profilePic = newFileName;
        req.body.password = encryptDecrypt.encrypt(req.body.password);
        req.body.platformBenefits = req.body.platformBenefits.split(",");
        //console.log({a});
        // return;
        //  var platformBenefits = JSON.stringify(platformBenefits);
        // delete req.body.platformBenefits;
        console.log(req.body);

        var journalists = new db.journalist(req.body);
        await journalists.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Journalist registered successfully",
          journalists
        );
      }
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  state: async (req, res) => {
    try {
      var countryId = req.query.id;
      const filteredStates = STATES.filter(state => {
        return state.country_id === countryId;
      });
      sendResponse.to_user(res, 200, null, "State list found", filteredStates);
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  city: async (req, res) => {
    try {
      var stateId = req.query.id;
      const filteredCity = CITY.filter(city => {
        return city.state_id === stateId;
      });
      sendResponse.to_user(res, 200, null, "City list found", filteredCity);
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  journalistLogin: async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId,
        password: encryptDecrypt.encrypt(req.body.password)
      };
      var journalistData = await db.journalist.findOne(condition);
      if (!journalistData) {
        sendResponse.to_user(
          res,
          400,
          null,
          "Email id or password is incorrect.",
          null
        );
      } else {
        authToken = generateToken.authToken({
          _id: journalistData._id
        });
        sendResponse.to_user(res, 200, null, "Login successfully", {
          journalistToken: authToken
        });
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  "forgotPassword": async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId,
        // status: 1,
      }
      var journalistData = await db.journalist.findOne(condition);
      if (!journalistData) {
        sendResponse.to_user(res, 400, null, ' Email does not exist.', null);
      } else {

        var otpGen = random(9999, 1111) // random integer between 10 and 50
        console.log("==>>", otpGen);
        journalistData.password = otpGen;
        await journalistData.save();

        console.log("==>>2", otpGen);

        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "satyendra.designoweb@gmail.com",
            pass: "satyadesignoweb@123"
          }
        });

        var mail = {
          from: "satyendra.designoweb@gmail.com",
          to: "satyendra05cs@gmail.com",
          subject: "Recover your account",
          text: "Hey Please use the code",
          html: "<b>your Recover code is:</b>" + otpGen,
        }

        smtpTransport.sendMail(mail, function (error, response) {
          if (error) {
            console.log("err", error)
            //sendResponse.to_user(res, 400, error, "Something went wrong");
          } else {
            console.log("success", response)
            sendResponse.to_user(res, 200, null, 'New password sent on your registered email.', null);
          }
          smtpTransport.close();
        });

      }
    } catch (e) {
      // console.log(e)
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }

  },



};
