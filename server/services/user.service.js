const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler")
const jwt = require('jsonwebtoken');
module.exports = {
	signup,
  login,
  addOrder,
  deleteOrder
}


async function signup(req,res){
  var condition = {
    $or:[{
    	emailId:req.body.emailId
    },{
    	phoneNumber:req.body.phoneNumber
    }]
  }
  var success = await db.user.findOne(condition);
  if(success){
    console.log(success);
     sendResponse.withOutData(res,404,"user is exist");
  }
  else{
  	var obj = new db.user(req.body);
  	var success = await obj.save();
    var token = jwt.sign(success.toJSON(), 'asddf'); 
     sendResponse.withObjectData(res,200,"success",{"success":success,"token":token});	
  }
}


async function login(req,res){
  var condition={
    $or:[{
      emailId:req.body.emailId,password:req.body.password
    },{
      phoneNumber:req.body.phoneNumber,password:req.body.password
    }]
  }
  var success=await db.user.findOne(condition);
  if(success){
    var token = jwt.sign(success.toJSON(), 'asddf'); 
     sendResponse.withObjectData(res,200,"success",{"success":success,"token":token});  
  }
  else{
    sendResponse.withOutData(res,400,"emailId or password not matched");
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

