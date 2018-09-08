const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler")
module.exports = {
	signup
}


async function signup(req,res){
  console.log(req.body);
  var condition = {
    $or:[{
    	emailId:req.body.emailId
    },{
    	phoneNumber:req.body.phoneNumber
    }]
  }

  var success = await db.user.findOne(condition);
  if(success){
  	 sendResponse.withOutData(res,400,"Email id and phoneNumber must be unique");
  }
  else{
  	var obj = new db.user(req.body);
  	var success = await obj.save();
  	sendResponse.withObjectData(res,200,"User register successfully",success);
  }

}