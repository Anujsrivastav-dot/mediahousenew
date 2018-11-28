const db = require("../dbConnection/dao");
const sendResponse = require("../helpers/responseHandler");
const generate = require("../helpers/generateAuthToken");
const upload = require("../helpers/uploadImage");

module.exports = {

    "addCategory": async(req, res) => {
        try {
            var condition = {
                name: {
                    $regex: ".*" + req.body.name + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.category.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 204, null, "Category name already taken");
            } else {
                var obj = new db.category(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Category added");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "updateCategory": async(req, res) => {
        try {
            var condition = {
                    name: {
                        $regex: ".*" + req.body.name + ".*",
                        $options: "si"
                    },
                    status: 1,
                    _id: {
                        $ne: req.params.categoryId
                    }
                },
                success = await db.category.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 204, null, "Category name already taken");
            } else {
                var category = await db.category.findOneAndUpdate({
                    _id: req.params.categoryId
                }, {
                    $set: {
                        name: req.body.name
                    }
                })
                sendResponse.to_user(res, 200, null, "Category updated");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "deleteCategory": async(req, res) => {
        try {
            var success = await db.category.findOneAndUpdate({
                _id: req.params.categoryId
            }, {
                $set: {
                    status: 0
                }
            });
            sendResponse.to_user(res, 200, null, "Category deleted");
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "categoryList": async(req, res) => {
        try {
            var condition = {
                "status": 1
            };
            if (req.body.search) {
                condition['name'] = {
                    $regex: ".*" + req.body.search + ".*",
                    $options: "si"
                }
            }
            var success = await db.category.paginate(condition, {
                limit: 10,
                page: req.body.pageNumber || 1
            })
            sendResponse.to_user(res, 200, null, "Category list found", success);
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "addProduct": async(req, res) => {
        try {
            var success = await db.product.findOne({
                "name": {
                    $regex: ".*" + req.body.name + ".*",
                    $options: "si"
                }
            });
            if (success) {
                sendResponse.to_user(res, 204, null, "Product name already taken");
            } else {
                var obj = new db.product(req.body);
                var product = await obj.save();
                sendResponse.to_user(res, 200, null, "Product added successfully.");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "updateProduct": async(req, res) => {
        try {
            var condition = {
                    status: 1,
                    name: {
                        $regex: ".*" + req.body.name + ".*",
                        $options: "si"
                    },
                    _id: {
                        $ne: req.params.productId
                    }
                }
                // get product details bases of condition
            var product = await db.product.findOne(condition, 'name');
            // if product is not empty then send response product name already taken
            if (product) {
                sendResponse.to_user(res, 204, null, "Product name already taken");
            }
            // else update the product details
            else {
                await db.product.findByIdAndUpdate(req.params.productId, req.body);
                sendResponse.to_user(res, 200, null, "Product updated");

            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "deleteProduct": async(req, res) => {
        try {
            var product = await db.product.findByIdAndUpdate(req.params.productId, {
                $set: {
                    status: 0
                }
            });
            sendResponse.to_user(res, 200, null, "Product deleted successfully");

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "productList": async(req, res) => {
        try {

            var condition = {
                "status": 1
            };
            if (req.body.search) {
                condition['name'] = {
                    $regex: ".*" + req.body.search + ".*",
                    $options: "si"
                }
            }
            var success = await db.product.paginate(condition, {
                select: "name categoryId createdAt image price description",
                page: req.body.pageNumber || 1,
                limit: 10,
                populate: {
                    path: "categoryId",
                    select: "name"
                }
            });

            sendResponse.to_user(res, 200, null, "Product list found", success);

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "enquiry": async(req, res) => {
        try {
            var obj = new db.enquiry(req.body);
            var enquiry = await obj.save();
            sendResponse.to_user(res, 200, null, "Your enquiry has been sent to admin");
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "enquiryList": async(req, res) => {
        try {
            var condition = {};
            if (req.body.search) {
                condition['name'] = {
                    $regex: ".*" + req.body.search + ".*",
                    $options: "si"
                }
            }
            var enquiry = await db.enquiry.paginate(condition, {
                page: req.body.pageNumber || 1,
                limit: 10,
                sort: '-createdAt'
            })
            sendResponse.to_user(res, 200, null, "Enquiry list found");

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "paginate": async(req, res) => {
        try {
            var success = await db.product.paginate({
                "categoryId": req.body.categoryId
            }, {
                page: 1,
                limit: 2
            });

            sendResponse.to_user(res, 200, null, "product find");
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "login": async(req, res) => {
        try {
            var condition = {
                emailId: req.body.emailId,
                password: req.body.password
            }
            var success = await db.admin.findOne(condition, 'name');

            if (success) {
                authToken = generate.authToken({
                    _id: success._id
                });
                // send success response
                sendResponse.to_user(res, 200, null, "Login successfully", {
                    "result": success,
                    "authtoken": authToken
                });
            } else {
                sendResponse.to_user(res, 404, null, "Please enter correct emailId and password");
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "userList": async(req, res) => {
        try {
            var condition = {
                "status": 1
            };
            if (req.body.search) {
                condition['name'] = {
                    $regex: ".*" + req.body.search + ".*",
                    $options: "si"
                }
            }
            var success = await db.user.paginate(condition, {
                page: req.body.pageNumber,
                limit: 10,
                sort: '-createdAt'
            });
            sendResponse.to_user(res, 200, null, "User List", success);
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "allCategoryList": async(req, res) => {
        try {
            var success = await db.category.find({
                status: 1
            }, 'name');
            sendResponse.to_user(res, 200, null, "Category list found", success);

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "updateEnquiryStatus": async(req, res) => {
        try {
            var user = await db.enquiry
                .findByIdAndUpdate(req.body.enquiryId, {
                    "$set": {
                        status: req.body.status
                    }
                })

            sendResponse.to_user(res, 200, null, "Enquiry status updated");

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    "uploadImage": async(req, res) => {
        try {
            upload.Image(req, (err, success) => {
                if (err) sendResponse.to_user(res, 400, err, 'Something went wrong');
                else sendResponse.to_user(res, 200, null, "Image uploaded", success);
            });
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    'addToCart': async(req, res) => {
        try {
            var condition = {
                userId: req.user._id,
                productId: req.body.productId
            };

            if (await db.product(condition)) {
                sendResponse.to_user(res, 204, null, 'Product already added in cart.');
            } else {
                var cartData = new db.cart({
                    userId: req.user._id,
                    productId: req.body.productId,
                    quantity: 1
                })

                await cartData.save();
                sendResponse.to_user(res, 204, null, 'Product added in cart.');
            }

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'updateCart': async(req, res) => {
        try {
            var cartData = await db.cart.findByIdAndUpdate(req.query.cartId, req.body);
            if (cartData) {
                sendResponse.to_user(res, 204, null, 'cart is updated');
            } else {
                sendResponse.to_user(res, 400, null, 'cartId not found');
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'getCartList': async(req, res) => {
        try {
            var condition = {
                status: 1
            }
            var data = await db.cart.find(condition);
            sendResponse.to_user(res, 204, null, 'list found', data);

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
    'deleteCart': async(req, res) => {
        try {
            await db.cart.remove({
                _id: req.query.cartId
            });
            sendResponse.to_user(res, 204, null, 'cart deleted');

        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    }

};