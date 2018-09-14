const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler");
const generate = require("../helpers/generateAuthToken");
module.exports = {

	addCategory,
	updateCategory,
	deleteCategory,
	categoryList,
	addProduct,
	updateProduct,
	deleteProduct,
	productList,
	enquiry,
	enquiryList,
	paginate,
	login,
	userList
};


// admin login service
async function login(req, res) {
	var condition = {
		emailId: req.body.emailId,
		password: req.body.password
	}
	var success = await db.admin.findOne(condition, 'name');

	if (success) {
		authToken = generate.authToken(success);
		// send success response
		sendResponse.withObjectData(res, 200, "Login successfully", {
			"result": success,
			"authtoken": authToken
		});
	} else {
		sendResponse.withOutData(res, 404, "Please enter correct emailId and password");
	}
}

// add cotegory service 
async function addCategory(req, res) {
	var condition = {
		name: req.body.name,
		status: 1
	};
	var success = await db.category.findOne(condition);
	if (success) {
		sendResponse.withOutData(res, 204, "Category name already taken");
	} else {
		var obj = new db.category(req.body);
		await obj.save();
		sendResponse.withOutData(res, 200, "Category added");
	}
}

// update category service
async function updateCategory(req, res) {

	var condition = {
			name: req.body.name,
			status: 1,
			_id: {
				$ne: req.params.categoryId
			}
		},
		success = await db.category.findOne(condition);
	if (success) {
		sendResponse.withOutData(res, 204, "Category name already taken");
	} else {
		var category = await db.category.findOneAndUpdate({_id:req.params.categoryId}, {
			$set: {
				name: req.body.name
			}
		})
		sendResponse.toUser(res, category, false, "Category updated", "Something went wrong");
	}
}

// delete category service
async function deleteCategory(req, res) {
	var success = await db.category.findOneAndUpdate({_id:req.params.categoryId}, {
		$set: {
			status: 0
		}
	});
	sendResponse.toUser(res, success, false, "Category deleted","Category deleted");
}

// get category list service
async function categoryList(req, res) {
	var success = await db.category.paginate({
		status: 1
	},{limit:10,page:req.body.pageNumber||1})
	sendResponse.toUser(res, success, true, "Category list found", "Category list empty");
}

// add product service
async function addProduct(req, res) {
	var success = await db.product.findOne({
		"name": req.body.name
	});
	if (success) {
		sendResponse.withOutData(res, 204, "Product name already taken");
	} else {
		var obj = new db.product(req.body);
		var product = await obj.save();
		sendResponse.toUser(res, product, false, "Product deleted", "Something went wrong");
	}
}

// update product details service
async function updateProduct(req, res) {
	var condition = {
		status: 1,
		name: req.body.name,
		_id: {
			$ne: req.body.name
		}
	}
	// get product details bases of condition
	var product = await db.product.findOne(condition, 'name');
	// if product is not empty then send response product name already taken
	if (product) {
		sendResponse.withOutData(res, 204, "Product name already taken");
	}
	// else update the product details
	else {
		var product = await db.product.findByIdAndUpdate(req.body._id, req.body);
		sendResponse.toUser(res, product, false, "product updated", "something went wrong");

	}

}

// delete product service
async function deleteProduct(req, res) {
	var product = await db.product.findByIdAndUpdate(req.body._id, {
		$set: {
			status: 0
		}
	});
	sendResponse.toUser(res, product, false, "Product deleted successfully", "Something went wrong");
}

// get product list service
async function productList(req, res) {
	var success = await db.product.find({
		status: 1
	})
	sendResponse.toUser(res, success, true, "Product list found", "Product list empty");
}


// save enquire details service
async function enquiry(req, res) {
	var obj = new db.enquiry(req.body);
	var enquiry = await obj.save();
	sendResponse.toUser(res, enquiry, true, "Your enquiry has been sent to admin");
}


// enquiry list service
async function enquiryList(req, res) {
	var enquiry = await db.enquiry.find({
		status: 1
	})
	sendResponse.toUser(res, enquiry, true, " E nquirylist found", "Enquiry list empty");
}


async function paginate(req, res) {
	var success = await db.product.paginate({
		"categoryId": req.body.categoryId
	}, {
		page: 1,
		limit: 2
	});
	console.log(success)
	sendResponse.toUser(res, success, true, "product find", "something went wrong");
}

async function userList(req, res) {
	var success = await db.user.paginate({
		"status": 1
	}, {
		page: req.body.pageNumber,
		limit: 10
	});
	sendResponse.toUser(res, success, true, "User List", "User List empty");
}