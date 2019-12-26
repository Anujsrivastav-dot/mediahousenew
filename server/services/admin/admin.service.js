const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const generate = require("../../helpers/generateAuthToken");
const upload = require("../../helpers/uploadImage");

module.exports = {

  // api for desigantion(add,delete,update,get)    
  "add": async(req, res) => {
    try {
        
            //console.log(req.file.adminImage)
            //var obj = new db.admin(req.file);
            var obj = new db.admin({
               
                adminImage: req.file.filename
            });
            //console.log(req.files.adminImage.name)
            await obj.save();
            sendResponse.to_user(res, 200, null, "admin added successfully",obj);
        
    } catch (e) {
        console.log(e)
        sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},

"get": async(req, res) => {
    try {
        var obj = await db.admin.find({status: 1});

        if (obj!='') {
            sendResponse.to_user(res, 200, null, "Designation get successfully",obj);
        } else {
            sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
        }
    } catch (e) {
         console.log(e)
        sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
    }
},


// api for desigantion(add,delete,update,get)    
    "addDesignation": async(req, res) => {
        try {
            var condition = {
                designationName: {
                    $regex: ".*" + req.body.designationName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.designation.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Designation already taken",null);
            } else {
                var obj = new db.designation(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Designation added successfully",obj);
            } 
        } catch (e) {
            console.log(e)
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getDesignation": async(req, res) => {
        try {
            var obj = await db.designation.find({status: 1}, { designationName: 1, status: 1, _id: 1 });

            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Designation get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
             console.log(e)
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateDesignation": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { designationName: req.body.designationName };
            var condition = {
                designationName: {
                    $regex: ".*" + req.body.designationName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.designation.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Designation already taken",null);
            }
            else{
            var success = await db.designation.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Designation Updated Successfully",success);
            } 
        } }catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteDesignation": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
           
            var success = await db.designation.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Designation Deleted Successfully",success);
            } 
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

  /// api for platform benefit(add,delete,update,get)  
    "addBenefit": async(req, res) => {
        try {
            var condition = {
                benefitName: {
                    $regex: ".*" + req.body.benefitName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.benefit.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Benefit already taken",null);
            } else {
                var obj = new db.benefit(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Benefit added successfully",obj);
            }
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getBenefit": async(req, res) => {
        try {
            var obj = await db.benefit.find({status: 1}, { benefitName: 1, status: 1, _id: 1 });
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Benefit get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateBenefit": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { benefitName: req.body.benefitName };
            var condition = {
                benefitName: {
                    $regex: ".*" + req.body.benefitName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.benefit.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Benefit already taken",null);
            }
            else{
            var success = await db.benefit.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Benefit Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Benefit Updated Successfully",success);
            } 
        }} catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteBenefit": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
           
            var success = await db.benefit.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Benefit Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Benefit Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for platform category(add,delete,update,get)  
    "addCategory": async(req, res) => {
        try {
            var condition = {
                categoryName: {
                    $regex: ".*" + req.body.categoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.category.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Category already taken", null);
            } else {
                var obj = new db.category(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Category added successfully",obj);
            }
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getCategory": async(req, res) => {
        try {
            var obj = await db.category.find({status: 1}, { categoryName: 1, status: 1, _id: 1 });
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Category get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateCategory": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { categoryName: req.body.categoryName };
            var condition = {
                categoryName: {
                    $regex: ".*" + req.body.categoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.category.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Category already taken", null);
            }
            else{
            var success = await db.category.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Category Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Category Updated Successfully",success);
            } 
        } }catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteCategory": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.category.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Category Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Category Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

/// api for platform category(add,delete,update,get)  
     "addStoryCategory": async(req, res) => {
        try {
            var condition = {
                storyCategoryName: {
                    $regex: ".*" + req.body.storyCategoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyCategory.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Category already taken", null);
            } else {
                var obj = new db.storyCategory(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Category added successfully",obj);
            }
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryCategory": async(req, res) => {
        try {
            var obj = await db.storyCategory.find({status: 1}, { storyCategoryName: 1, status: 1, _id: 1 });
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Story Category get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryCategory": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyCategoryName: req.body.storyCategoryName };
            var condition = {
                storyCategoryName: {
                    $regex: ".*" + req.body.storyCategoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyCategory.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Category already taken", null);
            }
            else{
            var success = await db.storyCategory.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Category Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Category Updated Successfully",success);
            } 
        } }catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryCategory": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyCategory.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Category Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Category Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

/// api for Story Type(add,delete,update,get)  
    "addStoryType": async(req, res) => {
        try {
            var condition = {
                storyTypeName: {
                    $regex: ".*" + req.body.storyTypeName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyType.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Type already taken", null);
            } else {
                var obj = new db.storyType(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Type added successfully",obj);
            }
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryType": async(req, res) => {
        try {
            var obj = await db.storyType.find({status: 1}, { storyTypeName: 1, status: 1, _id: 1 });
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Story Type get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryType": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyTypeName: req.body.storyTypeName };
            var condition = {
                storyTypeName: {
                    $regex: ".*" + req.body.storyTypeName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyType.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Type already taken", null);
            }
            else{
            var success = await db.storyType.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Type Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Type Updated Successfully",success);
            } 
        } }catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryType": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyType.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Type Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Type Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for Story Keyword(add,delete,update,get)  
    "addStoryKeyword": async(req, res) => {
        try {
            var condition = {
                storyKeywordName: {
                    $regex: ".*" + req.body.storyKeywordName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyKeyword.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Keyword already taken", null);
            } else {
                var obj = new db.storyType(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Keyword added successfully",obj);
            }
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryKeyword": async(req, res) => {
        try {
            var obj = await db.storyKeyword.find({status: 1}, { storyKeywordName: 1, status: 1, _id: 1 });
            if (obj!='') {
                sendResponse.to_user(res, 200, null, "Story Keyword get successfully",obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
            }
        } catch (e) {
            
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryKeyword": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyKeywordName: req.body.storyKeywordName };
            var condition = {
                storyKeywordName: {
                    $regex: ".*" + req.body.storyKeywordName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyKeyword.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Keyword already taken", null);
            }
            else{
            var success = await db.storyKeyword.findByIdAndUpdate(filter, update, {
                new: true
              })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Keyword Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Keyword Updated Successfully",success);
            } 
        } }catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryKeyword": async(req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyKeyword.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Keyword Not Found With Id",null);
            } 
            else {
                sendResponse.to_user(res, 200, null, "Story Keyword Deleted Successfully",success);
            } 
        } catch (e) {
           
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },



};