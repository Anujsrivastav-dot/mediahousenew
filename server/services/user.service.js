var db = require('../../dbConnection/dao'),
    sendResponse = require("../../helpers/responseHandler"),
    generate = require("../../helpers/generateAuthToken"),
    randomstring = require('randomstring'),
    sendMail = require("../../helpers/sendMail");



module.exports = {
    'categoryList': async(req, res) => {
        try {
            var success = await db.category.find({
                status: 1
            }, 'name');

            sendResponse.to_user(res, 200, null, 'Success', success);
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'productList': async(req, res) => {
        try {
            var condition = data.value == 'all' ? {
                    status: 1
                } : {
                    categoryId: data.value,
                    status: 1
                },
                success = await db.product.find(condition, 'image name price description');
            sendResponse.to_user(res, 200, null, 'Success', success);

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'addEnquiry': async(req, res) => {
        try {
            var data = new db.enquiry(data),
                success = await data.save();

            sendResponse.to_user(res, 200, null, 'Your request successfully sent to admin');

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'register': async(req, res) => {
        try {
            var condition = {
                    emailId: data.emailId,
                    phoneNumber: data.phoneNumber
                },
                success = await db.user.findOne(condition, 'emailId phoneNumber');
            if (success) {
                return {
                    reponseCode: 204,
                    responseMessage: data.emailId == success.emailId ? "Email id already exist" : 'Phone number already exist'
                }
            } else {
                var modalData = new db.user(data);
                var user = await modalData.save();
                var authToken = generate.authToken({
                    _id: user._id,
                    name: user.name
                });

                sendResponse.to_user(res, 200, null, 'Your account created successfully', {
                    name: user.name,
                    authToken: authToken
                });

            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'login': async(req, res) => {
        try {
            var condition = {
                phoneNumber: data.phoneNumber,
                password: data.password
            };
            var success = await db.user.findOne(condition, 'name');
            if (!success) {

                sendResponse.to_user(res, 204, null, 'Please enter valid emailId and password', {
                    name: success.name,
                    authToken: authToken
                });
            } else {
                var authToken = generate.authToken({
                    _id: success._id,
                    name: success.name
                });

                sendResponse.to_user(res, 200, null, 'Your account created successfully', {
                    name: success.name,
                    authToken: authToken
                });
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'forgotPassword': async(req, res) => {
        try {
            var success = await db.user.findOne({
                emailId: data.emailId
            }, 'password name emailId');
            if (success) {

                var newPassword = randomstring.generate({
                    length: 10,
                    charset: 'alphabetic'
                });

                success.password = newPassword;

                sendMail.createMail({
                    name: success.name,
                    email: success.emailId,
                    subject: 'Forgot Password',
                    msg: 'Your new password is :' + newPassword
                }, 'forgotPassword');

                await success.save();

                sendResponse.to_user(res, 200, null, "New password successfully sent your email address");
            } else {
                sendResponse.to_user(res, 204, null, "Email id does not exit");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'changePassword': async(req, res) => {
        try {
            var user = await db.user.findById(userId);
            if (user) {
                if (user.password == req.body.password) {
                    user.password = req.body.newPassword;
                    await user.save();
                    sendResponse.to_user(res, 200, null, 'password change successfully');
                } else {
                    sendResponse.to_user(res, 204, null, 'Please enter correct old password');
                }
            } else {
                sendResponse.to_user(res, 400, null, "Something went wrong");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'myOrder': async(req, res) => {
        try {
            var condititon = {
                    userId: req.decoded._id,
                    status: 1
                },
                orders = await db.order.find(condititon);
            sendResponse.toUser(res, 200, null, "Order list", "your order list empty", orders);
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'cancelOrder': async(req, res) => {
        try {
            var order = await db.order.findByIdAndUpdate(req.body._id, {
                $set: {
                    status: 0
                }
            });
            sendResponse.toUser(res, 200, null, "Order deleted successfully");
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }

    },
    'bookOrder': async(req, res) => {
        try {
            var obj = new db.order(req.body),
                order = await obj.save();
            sendResponse.toUser(res, 200, null, "Order booked successfully");
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    }
};