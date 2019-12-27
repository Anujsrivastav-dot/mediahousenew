const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const encryptDecrypt = require("../../helpers/cryptoPassword");

module.exports ={

  "signupJournalist": async(req, res) => {
    try {
        var newFileName = req.file.filename
        
             req.body.profilePic =newFileName
             req.body.status =1;
        var condition ={
          emailId:req.body.emailId
        }
        var success =await db.journalist.findOne(condition);
        if(success){
          console.log("success",success);
          sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Email id already taken",null);
        }else{
             req.body.profilePic =newFileName;
             req.body.password = encryptDecrypt.encrypt(req.body.password)
            var journalists = new db.journalist(req.body);
            await journalists.save();
            sendResponse.to_user(res, 200, null, "Journalist registered successfully",journalists);
        }
   } catch (e) {
            // console.log('err====', e);
            sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},


}