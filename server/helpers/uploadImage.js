var multer = require("multer");
const util = require("util");

    module.exports={
        uploadProfile,
    }


    async function uploadProfile(req, res) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, '../../images')
            },
            filename: function (req, file, cb) {
              cb(null, Date.now() + '.jpg') //Appending .jpg
            }
          })
          
          var upload = multer({ storage: storage });
    }



  