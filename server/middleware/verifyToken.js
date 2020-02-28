const jwt = require("jsonwebtoken");
var sendResponse = require("../helpers/responseHandler");
let config = require("../helpers/config")();
const db = require("../dbConnection/dao");

module.exports.verifyUserToken = async (req, res, next)=> {
	
	let token = req.headers.authtoken;
	if (token) {
		jwt.verify(token,config.secretKey, function(err, data) {
		if(data) {
			
			sendResponse.to_user(
				res,
				200,
				null,
				"token is verified successfully",
				data
			  );
		}
		else {
			sendResponse.to_user(
				res,
				200,
				null,
				"token is not verified",
				data
			  );
		}
})
	}
}