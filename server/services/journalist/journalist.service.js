const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const generate = require("../../helpers/generateAuthToken");
const uploadFile = require("../../helpers/uploadImage");

module.exports ={
  "signupJournalist": async(req, res) => {
    try {
        var fileName = await uploadFile.uploadProfile(req, res);
        console.log("fileName",fileName,req.body);
            // req.body.userId = req.user._id
            req.body.profilePic =fileName
            var journalists = new db.journalist(req.body);
            await journalists.save();
            sendResponse.to_user(res, 200, null, "Journalist registered successfully",journalists);
        
    } catch (e) {
        console.log('err====', e);
            sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},


}
