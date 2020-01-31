//== require packages ====//
let jwt = require("jsonwebtoken");
// config function
let config = require("../helpers/config")();
var sendResponse = require("../helpers/responseHandler");
const db = require("../dbConnection/dao");

module.exports.authenticateJournalist = function(req, res, next) {
  // Get authorication token in header
  let token = req.headers.authtoken;

  // if token exist then verify the token
  if (token) {
    jwt.verify(token, config.secretKey, function(err, journalist) {
      // if error occured that means token in not valid.
      if (err) {
        sendResponse.to_user(
          res,
          403,
          null,
          "Failed to authenticate token.",
          null
        );
      } else {
        db.journalist.findById(journalist._id).exec((err, success) => {
          if (err) {
            sendResponse.to_user(res, 500, null, "Server error", null);
          } else if (!success) {
            sendResponse.to_user(res, 403, null, "Invalid token", null);
          } else {
            if (success.status == 0) {
              req.journalist = success;
              next();
            } else {
              sendResponse.to_user(
                res,
                403,
                null,
                "you are not verified user contact to admin",
                null
              );
            }
          }
        });
      }
    });
  } else {
    sendResponse.to_user(res, 403, null, "No token provided", null);
  }
};
