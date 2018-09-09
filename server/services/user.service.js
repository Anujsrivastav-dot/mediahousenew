const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler")
module.exports = {
	signup,
  addOrder,
  deleteOrder
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
async function addOrder(req,res){
  var obj = new db.order(req.body);
     await obj.save();
     sendResponse.withOutData(res,200," order saved");
}


async function deleteOrder(req,res){
var success=await db.order.findByIdAndUpdate(req.body._id,{$set:{status:0}});
     sendResponse.toUser(res,success,false,"order deleted","something went wrong");
}

