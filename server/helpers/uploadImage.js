// var multer = require("multer");
// const util = require("util");

//     module.exports={
//         uploadProfile
//     }
    
//  async function uploadProfile(req, res) {
//     // console.log('req in file',req.file.mimetype)
     
//         var storage = multer.diskStorage({
//             destination: function(req, file, callback) {
//               console.log(req.file)
//                 callback(null, 'images')
//             },
//             filename: function(req, file, callback) {
//                  callback(null, `imageupload_${file.originalname}`)
//             }
//           });
//          multer({ storage : storage}).single("profilePic");
//         return req.files.name;
//      }
//         // return req.files[0].filename
//     // }