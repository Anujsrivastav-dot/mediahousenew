const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const generate = require("../../helpers/generateAuthToken");
const upload = require("../../helpers/uploadImage");

module.exports = {

    "addDesignation": async(req, res) => {
        try {
            var condition = {
                designationName: {
                    $regex: ".*" + req.body.designationName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.designation.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 204, null, "Designation already taken",null);
            } else {
                var obj = new db.designation(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Designation added successfully",obj);
            }
        } catch (e) {
            // console.log(e)
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

};