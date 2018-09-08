//== require packages ====//
let jwt = require("jsonwebtoken");
// config function
let config = require("../helpers/config")();
var sendResponse = require("../helpers/responseHandler");
const db = require('../dbConnection/dao');
module.exports.authenticateUser = function(req, res, next) {
    // Get authorication token in header
    let token = req.headers.authtoken;
    // if token exist then verify the token
    if (token) {

        jwt.verify(token, config.secretKey, function(err, decoded) {
            // if error occured that means token in not valid
            if (err) {
                sendResponse.withOutData(res, 403, "Failed to authenticate token.");
            }
            // token verified then enter in else block
            else {

                console.log('/------decoded token--------/');
                console.log(decoded);
                req.decoded = decoded['_doc'] ? decoded._doc : decoded;
                db.user.findById(req.decoded._id).select('status').exec((err, success) => {
                    if (err) {
                        sendResponse.withOutData(res, 500, "Server error");
                    } else if (!success) {
                        sendResponse.withOutData(res, 404, "Invalid token");
                    } else {
                        if (success.status == 1) {
                            next()
                        } else {
                            sendResponse.withOutData(res, 403, "Invalid token");
                        }
                    }
                })
            }
        });
    } else {
        sendResponse.withOutData(res, 403, "No token provided");
    }
}



module.exports.authenticateAdmin = function(req, res, next) {
    // Get authorication token in header
    let token = req.headers.authtoken;
    // if token exist then verify the token
    if (token) {

        jwt.verify(token, config.secretKey, function(err, decoded) {
            // if error occured that means token in not valid
            if (err) {
                sendResponse.withOutData(res, 403, "Failed to authenticate token.");
            }
            // token verified then enter in else block
            else {

                console.log('/------decoded token--------/');
                console.log(decoded);
                req.decoded = decoded['_doc'] ? decoded._doc : decoded;
                db.admin.findById(req.decoded._id).select('status').exec((err, success) => {
                    if (err) {
                        sendResponse.withOutData(res, 500, "Server error");
                    } else if (!success) {
                        sendResponse.withOutData(res, 404, "Invalid token");
                    } else {
                        if (success.status == 1) {
                            next()
                        } else {
                            sendResponse.withOutData(res, 403, "Invalid token");
                        }
                    }
                })
            }
        });
    } else {
        sendResponse.withOutData(res, 403, "No token provided");
    }
}