const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");

module.exports ={
  "myContentService": async(req, res) => {
    try {
         var file=req.files;
         var uploadTexts=[];
             file.forEach(file => {
              uploadTexts.push(file['filename']);
              });
        req.body.myContent=uploadTexts;
        var story = new db.myContents(req.body);
        await story.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Content Upload successfully",
          story
        );
      
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },



 
}