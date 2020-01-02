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
             var textNote =req.body.textNote.split(",");
             var imageNote =req.body.imageNote.split(",");
             var videoNote =req.body.videoNote.split(",");
             var docNote =req.body.docNote.split(",");
             var thumbnaleNote =req.body.thumbnaleNote.split(",");
             var audioNote =req.body.audioNote.split(","); 
             var uploadTexts=[];
             var uploadImages=[];
             var uploadVideos=[];
             var uploadThumbnails=[];
             var supportingDocs=[];
             var uploadAudios=[];
             var l=0;
             imageArray['uploadTexts'].forEach(txt => {
              uploadTexts.push({text:txt['filename'],textNote:textNote[l]},);
              l++;
            });
            var k=0;
            imageArray['uploadImages'].forEach(img => {
              uploadImages.push({Image:img['filename'],imageNote:imageNote[k]},);
            k++;
            });
            var  j=0;
            imageArray['uploadVideos'].forEach(vid => {
              uploadVideos.push({video:vid['filename'],videoNote:videoNote[j]},);
            j++; 
            });
            var i=0;
            imageArray['uploadThumbnails'].forEach(thumb => {
              uploadThumbnails.push({thumbnale:thumb['filename'],thumbnaleNote:thumbnaleNote[i]},);
            i++; 
            });
            var m=0;
            imageArray['supportingDocs'].forEach(docs => {
              supportingDocs.push({doc:docs['filename'],docNote:docNote[m]},);
              m++; 
            });
            var n=0;
            imageArray['uploadAudios'].forEach(audio => {
              uploadAudios.push({audio:audio['filename'],audioNote:audioNote[n]},);
              n++; 
            });
            req.body.uploadTexts=uploadTexts; 
            req.body.uploadImages=uploadImages;
            req.body.uploadVideos=uploadVideos;
            req.body.uploadThumbnails=uploadThumbnails;
            req.body.supportingDocs=supportingDocs;
            req.body.uploadAudios=uploadAudios;
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
           var textNote =req.body.textNote.split(",");
           var imageNote =req.body.imageNote.split(",");
           var videoNote =req.body.videoNote.split(",");
           var docNote =req.body.docNote.split(",");
           var thumbnaleNote =req.body.thumbnaleNote.split(",");
           var audioNote =req.body.audioNote.split(","); 
           var uploadTexts=[];
           var uploadImages=[];
           var uploadVideos=[];
           var uploadThumbnails=[];
           var supportingDocs=[];
           var uploadAudios=[];
           var l=0;
           imageArray['uploadTexts'].forEach(txt => {
            uploadTexts.push({text:txt['filename'],textNote:textNote[l]},);
            l++;
          });
          var k=0;
          imageArray['uploadImages'].forEach(img => {
            uploadImages.push({Image:img['filename'],imageNote:imageNote[k]},);
          k++;
          });
          var  j=0;
          imageArray['uploadVideos'].forEach(vid => {
            uploadVideos.push({video:vid['filename'],videoNote:videoNote[j]},);
          j++; 
          });
          var i=0;
          imageArray['uploadThumbnails'].forEach(thumb => {
            uploadThumbnails.push({thumbnale:thumb['filename'],thumbnaleNote:thumbnaleNote[i]},);
          i++; 
          });
          var m=0;
          imageArray['supportingDocs'].forEach(docs => {
            supportingDocs.push({doc:docs['filename'],docNote:docNote[m]},);
            m++; 
          });
          var n=0;
          imageArray['uploadAudios'].forEach(audio => {
            uploadAudios.push({audio:audio['filename'],audioNote:audioNote[n]},);
            n++; 
          });
          req.body.uploadTexts=uploadTexts;
          req.body.uploadImages=uploadImages;
          req.body.uploadVideos=uploadVideos;
          req.body.uploadThumbnails=uploadThumbnails;
          req.body.supportingDocs=supportingDocs;
          req.body.uploadAudios=uploadAudios;
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