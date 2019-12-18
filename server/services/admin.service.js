const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler");
const generate = require("../helpers/generateAuthToken");
const upload = require("../helpers/uploadImage");

module.exports = {

    // "addCategory": async(req, res) => {
    //     try {
    //         var condition = {
    //             name: {
    //                 $regex: ".*" + req.body.name + ".*",
    //                 $options: "si"
    //             },
    //             status: 1
    //         };
    //         var success = await db.category.findOne(condition);
    //         if (success) {
    //             sendResponse.to_user(res, 204, null, "Category name already taken");
    //         } else {
    //             var obj = new db.category(req.body);
    //             await obj.save();
    //             sendResponse.to_user(res, 200, null, "Category added");
    //         }
    //     } catch (e) {
    //         sendResponse.to_user(res, 400, e, 'Something went wrong');
    //     }
    // },
   

};