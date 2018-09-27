var jwt = require("jsonwebtoken"),
	config = require("./config")(),
	_ = require("underscore");
token = {
	"authToken": function(data) {
		console.log(data)
		var token = jwt.sign(data.toJSON(), config.secretKey);
		return token;
	}
}
module.exports = token;