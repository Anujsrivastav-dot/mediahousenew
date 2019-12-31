const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
// const generate = require("../../helpers/generateAuthToken");
// const uploadFile = require("../../helpers/uploadImage");
// var multer = require("multer");
// let path = require('path');
// let fs = require('fs');
// let mv = require('mv');
// let waterfall = require("async-waterfall");
// let async = require("async");


module.exports ={
  "postStory": async(req, res) => {
    try {
         var imageArray=req.files;
             var uploadTexts=[];
             var uploadImages=[];
             var uploadVideos=[];
             var uploadThumbnails=[];
             var supportingDocs=[];
             var uploadAudios=[];
             imageArray['uploadTexts'].forEach(txt => {
              uploadTexts.push(txt['filename']); 
            });
            imageArray['uploadImages'].forEach(img => {
              uploadImages.push(img['filename']); 
            });
            imageArray['uploadVideos'].forEach(vid => {
              uploadVideos.push(vid['filename']); 
            });
            imageArray['uploadThumbnails'].forEach(thumb => {
            uploadThumbnails.push(thumb['filename']); 
            });
            imageArray['supportingDocs'].forEach(docs => {
            supportingDocs.push(docs['filename']); 
            });
            imageArray['uploadAudios'].forEach(audio => {
              uploadAudios.push(audio['filename']); 
            });
            req.body.uploadTexts=uploadTexts;
            req.body.uploadImages=uploadImages;
            req.body.uploadVideos=uploadVideos;
            req.body.uploadThumbnails=uploadThumbnails;
            req.body.supportingDocs=supportingDocs;
            req.body.uploadAudios=uploadAudios;
            req.body.status=1;
            req.body.keywordId = req.body.keywordId.split(",");
        var story = new db.story(req.body);
        await story.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Story post successfully",
          story
        );
      
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
},

"sellStory": async(req, res) => {
  try {
       var imageArray=req.files;
           var uploadTexts=[];
           var uploadImages=[];
           var uploadVideos=[];
           var uploadThumbnails=[];
           var supportingDocs=[];
           var uploadAudios=[];
           imageArray['uploadTexts'].forEach(txt => {
            uploadTexts.push(txt['filename']); 
          });
          imageArray['uploadImages'].forEach(img => {
            uploadImages.push(img['filename']); 
          });
          imageArray['uploadVideos'].forEach(vid => {
            uploadVideos.push(vid['filename']); 
          });
          imageArray['uploadThumbnails'].forEach(thumb => {
          uploadThumbnails.push(thumb['filename']); 
          });
          imageArray['supportingDocs'].forEach(docs => {
          supportingDocs.push(docs['filename']); 
          });
          imageArray['uploadAudios'].forEach(audio => {
            uploadAudios.push(audio['filename']); 
          });
          req.body.uploadTexts=uploadTexts;
          req.body.uploadImages=uploadImages;
          req.body.uploadVideos=uploadVideos;
          req.body.uploadThumbnails=uploadThumbnails;
          req.body.supportingDocs=supportingDocs;
          req.body.uploadAudios=uploadAudios;
          req.body.status=1;
          req.body.keywordId = req.body.keywordId.split(",");
      var story = new db.story(req.body);
      await story.save();
      sendResponse.to_user(
        res,
        200,
        null,
        "Story post successfully",
        story
      );
    
  } catch (e) {
    console.log("err====", e);
    sendResponse.to_user(res, 400, e, "Something went wrong");
  }
},


}