var multer = require("multer");
const util = require("util");

    module.exports={
        uploadProfile
    }


 async function uploadProfile(req, res) {
         var fileName ='';
        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                console.log({file})
                cb(null, './images')
            },
            filename: function(req, file, cb) {
                console.log(file);
                fileName = Date.now() + '.' + file.originalname.split(".").pop();
                cb(null, fileName)
            }
        });
        this.upload = multer({
            storage: storage
        });
       const upload1 = util.promisify(this.upload.any());
        await upload1(req, res);
        console.log({filename})
        return  filename ;
        // return req.files[0].filename
    }



  