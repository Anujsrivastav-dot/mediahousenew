var db = require('../../dbConnection/dao'),
   sendResponse = require("../../helpers/responseHandler");


module.exports = {
	categoryList ,productList, addEnquiry
};


async function categoryList(){
  var success = await db.category.find({status:1},'name');
  return {
  	 result : success,
  	 flag : true,
  	 msg1:'Success',
  	 msg2:'Categor list empty'
  }
}

async function productList(data){
	var condition = data.value =='all'? { status :1} :{ categoryId : data.value , status :1 },
	 success =  await db.product.find(condition,'image name price description');
	 return { result : success, flag : true, msg1:'Success', msg2:'Product list empty'};
}

async function addEnquiry(data){
   var data =  new db.enquiry(data),
   success =  await data.save();
   return { result : success, flag : false, 
    msg1:'Your request successfully sent to admin', msg2:'Something went wrong'};

}





