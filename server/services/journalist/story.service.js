const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
// const generate = require("../../helpers/generateAuthToken");
// const uploadFile = require("../../helpers/uploadImage");
// var multer = require("multer");
// let path = require('path');
// let fs = require('fs');
// let mv = require('mv');
// let waterfall = require("async-waterfall");
// let async = require("async");


module.exports ={
  "postStory": async(req, res) => {
    try {
        var newFileName = req.file.filename
        if(r)
             req.body.profilePic =newFileName
            var journalists = new db.journalist(req.body);
            await journalists.save();
            sendResponse.to_user(res, 200, null, "Journalist registered successfully",journalists);
        
    } catch (e) {
        console.log('err====', e);
            sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},


}