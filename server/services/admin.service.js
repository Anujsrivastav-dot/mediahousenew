const db=require("../dbConnection/dao");
const sendResponse=require("../helpers/responseHandler");
module.exports = {
addCategory,
updateCategory,
deleteCategory,
getCategoryList,
addProduct,
updateProduct,
deleteProduct,
getProductList,
enquiry,
getEnquiryList,
paginate
};
// add cotegory 
async function addCategory(req,res){
	var condition = { name : req.body.name };
	var success = await db.category.findOne(condition);
	if(success){
		sendResponse.withOutData(res,400,"category name already taken");
	}
	else{
		var obj = new db.category(req.body);
		 await obj.save();
		 sendResponse.withOutData(res,200,"category added");
	}	 
}


async function updateCategory(req,res){
var success=await db.category.findByIdAndUpdate(req.body._id,{$set:{name:req.body.name}});
     sendResponse.toUser(res,success,false,"category updated","something went wrong");
}


async function deleteCategory(req,res){
var success=await db.category.findByIdAndUpdate(req.body._id,{$set:{status:0}});
     sendResponse.toUser(res,success,false,"category deleted","something went wrong");
}


async function getCategoryList(req,res){
var success=await db.category.find({status:1})
     sendResponse.toUser(res,success,true,"category list found","category does not exist");
}


async function addProduct(req,res){
	console.log(req.body)
	var success = await db.product.findOne({"name":req.body.name});
	if(success){
		sendResponse.withOutData(res,400,"product name already taken");
	}
	else{
		var obj = new db.product(req.body);
		 await obj.save();
		 sendResponse.withOutData(res,200,"product added");
	}	
}

async function updateProduct(req,res){
var success=await db.product.findByIdAndUpdate(req.body._id,req.body);
   console.log(success)
     sendResponse.toUser(res,success,false,"product updated","something went wrong");
}

async function deleteProduct(req,res){
var success=await db.product.findByIdAndUpdate(req.body._id,{$set:{status:0}});
     sendResponse.toUser(res,success,false,"product deleted","something went wrong");
}


async function getProductList(req,res){
var success=await db.product.find({status:1})
     sendResponse.toUser(res,success,true,"product list found","product does not exist");

}


async function enquiry(req,res){
	var obj=new db.enquiry(req.body);
	await obj.save();
	 sendResponse.withOutData(res,200," enquiry saved")
}

async function getEnquiryList(req,res){
var success=await db.enquiry.find({status:1})
     sendResponse.toUser(res,success,true," enquirylist found","category does not exist");

}

async function paginate(req,res){
var success=await db.product.paginate({"categoryId":req.body.categoryId},{page:1,limit:2});
   console.log(success)
     sendResponse.toUser(res,success,true,"product find","something went wrong");
}













