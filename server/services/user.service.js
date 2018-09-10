const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler");
const generate = require("../helpers/generateAuthToken");

module.exports = {
  signup,
  login,
  addOrder,
  deleteOrder
}


async function signup(req, res) {
  // condititon check emailId and phoneNumber already exit in database
  var condition = {
    $or: [{
      emailId: req.body.emailId
    }, {
      phoneNumber: req.body.phoneNumber
    }]
  }

  if (await db.user.findOne(condition)) {
    // send response email id or password already taken
    sendResponse.withOutData(res, 204, "Email id or phoneNumber alrady taken");
  } else {
    // save new user data in database
    var obj = new db.user(req.body),
      success = await obj.save(),
      // generate auth token with _id & name
      authToken = generate.authToken(_.pick(success, '_id', 'name'));
    // send success response
    sendResponse.withObjectData(res, 200, "Your account successfully created", {
      "result": success,
      "authToken": authToken
    });
  }
}


async function login(req, res) {
  var condition = {
    emailId: req.body.emailId,
    password: req.body.password

  }
  var success = await db.user.findOne(condition, 'name');
  if (success) {
    // generate auth token with _id & name
    authToken = generate.authToken(success);
    // send success response
    sendResponse.withObjectData(res, 200, "Your account successfully created", {
      "result": success,
      "authToken": authToken
    });
  } else {
    // send response email id or password is incorrect
    sendResponse.withOutData(res, 204, "Please enter correct emailId and password");
  }

}


async function bookOrder(req, res) {
  var obj = new db.order(req.body),
    order = await obj.save();
  sendResponse.toUser(res, order, false, "Order booked successfully");
}


async function cancelOrder(req, res) {
  var order = await db.order.findByIdAndUpdate(req.body._id, {
    $set: {
      status: 0
    }
  });
  sendResponse.toUser(res, order, false, "Order deleted successfully");
}


// get order list of bases of userId
async function myOrders(req, res) {
  var condititon = {
      userId: req.decoded._id,
      status: 1
    },
    orders = await db.order.find(condititon);

  sendResponse.toUser(res, orders, true, "Order list", "your order list empty");

}