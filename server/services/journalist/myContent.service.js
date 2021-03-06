const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");

module.exports = {
  myContent: async (req, res) => {
    try {
      var file = req.files;
      var uploadFiles = [];
      file.forEach(file => {
        uploadFiles.push({
          contentOriginalName: file["originalname"],
          contentDuplicateName: file["path"]
        });
      });
      req.body.myContent = uploadFiles;
      req.body.journalistId = req.journalist._id;
      var content = new db.myContents(req.body);
      await content.save();
      sendResponse.to_user(
        res,
        200,
        null,
        "Content Upload successfully",
        content
      );
    } catch (e) {
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },
  updatemyContent: async (req, res) => {
    try {
      var success = await db.myContents.updateOne(
        { "myContent._id": req.body.contentId },
        { $set: { "myContent.$.contentOriginalName": req.body.fileName } }
      );
      var result = {
        contentOriginalName: req.body.fileName
      };
      console.log(success);
      if (success.nModified == 0) {
        sendResponse.to_user(
          res,
          404,
          "DATA_NOT_FOUND",
          "Content Not Found With Id",
          null
        );
      } else {
        sendResponse.to_user(
          res,
          200,
          null,
          "Content Updated Successfully",
          result
        );
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },
  getMyContent: async (req, res) => {
    try {
      var options = {
        select: "myContent",
        sort: { createdAt: -1 },
        limit: 10,
        page: req.query.pageNumber || 1
      };
      var obj = await db.myContents.paginate(
        { journalistId: req.journalist._id },
        options
      );

      if (obj != "") {
        sendResponse.to_user(res, 200, null, "Content get successfully", obj);
      } else {
        sendResponse.to_user(res, 200, "NO_CONTENT", "No Data Avilable", null);
      }
    } catch (e) {
      sendResponse.to_user(res, 400, "Bad request", "Something went wrong");
    }
  },
  deleteMyContent: async (req, res) => {
    console.log();
    try {
      const filter = { "myContent._id": req.body.id };
      var success = await db.myContents.findByIdAndRemove(filter);
      if (!success) {
        sendResponse.to_user(
          res,
          404,
          "DATA_NOT_FOUND",
          "myContents Not Found With Id",
          null
        );
      } else {
        sendResponse.to_user(
          res,
          200,
          null,
          "myContents Deleted Successfully",
          success
        );
      }
    } catch (e) {
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  }
};
