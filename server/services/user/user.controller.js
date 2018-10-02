const service = require('./user.service');
const sendResponse = require("../../helpers/responseHandler");
module.exports = {
	categoryList,productList,addEnquiry,register,login,forgotPassword
};


function categoryList(req, res) {
	service.categoryList()
		.then(user => sendResponse.toUser(res, user.result, user.flag, user.msg1, user.msg2))
		.catch(err => sendResponse.withOutData(res, 400, "Something went wrong"));
}
function productList(req, res) {
	service.productList(req.query)
		.then(user => res.send(user))
		.catch(err => res
		.send({ responseCode : 400,responseMessage :"Something went wrong"}));
}

function addEnquiry(req, res) {
	service.addEnquiry(req.body)
		.then(user => sendResponse.toUser(res, user.result, user.flag, user.msg1, user.msg2))
		.catch(err => sendResponse.withOutData(res, 400, "Something went wrong"));
}
function register(req, res) {
	service.register(req.body)
		.then(user => res.send(user))
		.catch(err => res.send({ responseCode : 400,responseMessage :"Something went wrong"}));
}
function login(req, res) {
	service.login(req.body)
		.then(user => res.send(user))
		.catch(err => res
		.send({ responseCode : 400,responseMessage :"Something went wrong"}));
}
function forgotPassword(req, res) {
	service.forgotPassword(req.body)
		.then(user => res.send(user))
		.catch(err => res
		.send({ responseCode : 400,responseMessage :"Something went wrong"}));
}


