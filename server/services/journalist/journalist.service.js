const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const generate = require("../../helpers/generateAuthToken");
const uploadFile = require("../../helpers/uploadImage");
var multer = require("multer");
let path = require('path');
let fs = require('fs');
let mv = require('mv');
let waterfall = require("async-waterfall");
let async = require("async");


module.exports ={
  "signupJournalist": async(req, res) => {
    try {
        // console.log(req.files)
        // var imgUrl = [];
        // if (!req.files) {
        //     //check image exist or not
        //     callback("Please choose image first", null);
        // } else {
        //     waterfall([
        //           (cb) => {
        //             var _dirName = imagePath;
        //             async.forEachOfLimit(req.files, 1, (value, key, next) => {
        //                 var _name = new Date().getTime() + "_" + value.name.split(".")[0] + "." + value.mimetype.split("/")[1];
        //                 var _filepath = path.join(_dirName, _name);
        //                 _responsePath = "images/" + _name;
        //                 req.files[key].mv(_filepath, (err) => {
        //                     if (err) {
        //                         cb(err, null);
        //                     } else {
        //                         imgUrl.push(_responsePath);
        //                         next();
        //                     }
        //                 })
        //             }, (err, success) => {
        //                 cb(null, imgUrl);
        //             })

        //         }
        //     ], (err, waterfallSuccess) => {
        //         res.send(waterfallSuccess)
        //     })
        // }

    
        var fileName = await uploadFile.uploadProfile(req, res);
        console.log("===>77777",fileName)
            // req.body.profilePic =fileName
            req.body.profilePic = "/images/" + fileName;

            var journalists = new db.journalist(req.body);
            await journalists.save();
            sendResponse.to_user(res, 200, null, "Journalist registered successfully",journalists);
        
    } catch (e) {
        console.log('err====', e);
            sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},


}
