let jwt = require("jsonwebtoken");
let config = require("./config")();
var sendResponse = require("../helpers/responseHandler");
const db = require('../dbConnection/dao');


module.exports.checkUserToken = (req, res, next) => {
    var token = req.header.authtoken;
    if (token) {

        jwt.verify(token, config.secretKey, (err, user) => {
            if (err) {
                sendResponse.withOutData(res, 403, "Failed to authenticate token.");
            } else {
                console.log('/------decoded token--------/');
                console.log(user);
                req.user = user;
                db.user.findById(req.user._id).exec((err, success) => {
                    if (err) {
                        sendResponse.withOutData(res, 500, "Server error");
                    } else if (!success) {
                        sendResponse.withOutData(res, 404, "Invalid token");
                    } else {
                        if (success.status == 1) {
                            req.user = success;
                            next();
                        } else {
                            sendResponse.withOutData(res, 403, "Invalid token");
                        }
                    }
                })
            }
        })

    } else {
        sendResponse.withOutData(res, 403, "No token provided");
    }

}


module.exports.authenticateAdmin = (req, res, next) => {
    var token = req.header.authtoken;
    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                sendResponse.withOutData(res, 403, "Failed to authenticate token.");
            } else {
                console.log('/------decoded token--------/');
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        })

    } else {
        sendResponse.withOutData(res, 403, "No token provided");
    }

}