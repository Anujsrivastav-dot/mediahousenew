var jwt = require("jsonwebtoken"),
	config = require("./config")(),
	_ = require("underscore"),
	authToken = {
		"loginUser": function(data) {
			var token = jwt.sign(_.clone(data), config.secretKey);
			return token;
		}
	}
module.exports = authToken;