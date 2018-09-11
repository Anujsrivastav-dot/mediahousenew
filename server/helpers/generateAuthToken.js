var jwt = require("jsonwebtoken"),
	config = require("./config")(),
	_ = require("underscore");
token = {
	"authToken": function(data) {
		var token = jwt.sign(_.clone(data), config.secretKey);
		return token;
	}
}
module.exports = token;