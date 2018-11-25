var db = require('../../dbConnection/dao'),
    sendResponse = require("../../helpers/responseHandler"),
    generate = require("../../helpers/generateAuthToken"),
    randomstring = require('randomstring'),
    sendMail = require("../../helpers/sendMail");



module.exports = {
    categoryList,
    productList,
    addEnquiry,
    register,
    login,
    forgotPassword
};


async function categoryList() {
    var success = await db.category.find({
        status: 1
    }, 'name');
    return {
        result: success,
        flag: true,
        msg1: 'Success',
        msg2: 'Categor list empty'
    }
}

async function productList(data) {
    var condition = data.value == 'all' ? {
            status: 1
        } : {
            categoryId: data.value,
            status: 1
        },
        success = await db.product.find(condition, 'image name price description');
    return {
        responseCode: 200,
        responseMessage: 'Success',
        result: success
    };
}

async function addEnquiry(data) {
    var data = new db.enquiry(data),
        success = await data.save();
    return {
        result: success,
        flag: false,
        msg1: 'Your request successfully sent to admin',
        msg2: 'Something went wrong'
    };
}

async function register(data) {

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
        return {
            responseCode: 200,
            responseMessage: "Your account created successfully",
            result: {
                name: user.name,
                authToken: authToken
            }
        }
    }
}

async function login(data) {
    var condition = {
        phoneNumber: data.phoneNumber,
        password: data.password
    };
    var success = await db.user.findOne(condition, 'name');
    if (!success) {
        return {
            responseCode: 204,
            responseMessage: 'Please enter valid emailId and password'
        }
    } else {
        var authToken = generate.authToken({
            _id: success._id,
            name: success.name
        });
        return {
            responseCode: 200,
            responseMessage: "Your account created successfully",
            result: {
                name: success.name,
                authToken: authToken
            }
        }
    }
}

async function forgotPassword(data) {
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

        success.save();
        return {
            responseCode: 200,
            responseMessage: "New password successfully sent your email address."
        }
    } else {
        return {
            responseCode: 204,
            responseMessage: "Email id does not exit"
        }
    }
}

async function changePassword(data) {
    var user = await db.user.findById(userId);
    if (user) {
        if (user.password == req.body.password) {
            user.password = req.body.newPassword;
            user.save();
            return {
                responseCode: 200,
                responseMessage: "password change successfully"
            }
        } else {
            return {
                responseCode: 204,
                responseMessage: "Please enter correct old password"
            }
        }
    } else {
        return {
            responseCode: 400,
            responseMessage: "Something went wrong"
        }
    }
}