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
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Designation already taken",null);
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

    "getDesignation": async(req, res) => {
        try {
            var obj = await db.designation.find({status: 1});
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Designation get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            // console.log(e)
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateDesignation": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { designationName: req.body.designationName };
            
            var success = await db.designation.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Designation Updated Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteDesignation": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
           
            var success = await db.designation.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Designation Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },


};