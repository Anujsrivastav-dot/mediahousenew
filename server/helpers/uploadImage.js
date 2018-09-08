//=====  file up
//load dependency
let path = require('path');
let fs = require('fs');
let mv = require('mv');
let waterfall = require("async-waterfall");
let async = require("async");

var uploadImage = {
    "Image": (req, callback) => {
        console.log(req.files)
        var imgUrl = [];
        if (!req.files) {
            //check image exist or not
            callback("Please choose image first", null);
        } else {
            waterfall([
                (cb) => {
                    var _storageDirExists = fs.existsSync("storage");
                    if (!_storageDirExists) {
                        // if storage directory not exist
                        fs.mkdir("storage", () => {
                            cb();
                        })
                    } else {
                        // if storage directory already  created
                        cb();
                    }
                }, (cb) => {
                    // add new sub Directory in storage directory
                    var _dirName = path.join(__dirname, "../../storage", "images");
                    // check sub directory name exist or not
                    var _isDirExist = fs.existsSync(_dirName);
                    // get the extension type of req file and merge with timestamp and get the name of file
                    if (!_isDirExist) {
                        // if directory not exist then create the directory 
                        fs.mkdir(_dirName, () => {
                            cb(null, _dirName);
                        })
                    } else {
                        cb(null, _dirName);
                    }
                }, (_dirName, cb) => {
                    async.forEachOfLimit(req.files, 1, (value, key, next) => {
                        // take the _name with timestamp and name of image
                        var _name = new Date().getTime() + "_" + value.name.split(".")[0] + "." + value.mimetype.split("/")[1];
                        // create file path with directory name and  file Name
                        var _filepath = path.join(_dirName, _name);
                        //_responsePath = path.join("../../storage", "../../storage/images", _name);
                        _responsePath = "storage/images/" + _name;

                        // move file in images folder
                        req.files[key].mv(_filepath, (err) => {
                            if (err) {
                                cb(err, null);
                            } else {
                                // push path of image
                                imgUrl.push(_responsePath);
                                // call next object
                                next();
                            }
                        })
                    }, (err, success) => {
                        cb(null, imgUrl);
                    })

                }
            ], (err, waterfallSuccess) => {
                callback(err, waterfallSuccess);
            })
        }
    },
    "unlinkFile": (files) => {
        files.forEach(function(filename) {
            var _dirName = path.join(__dirname, "../..", filename);
            fs.unlink(_dirName, (err) => {
                if (err) console.log('Error to removing image');
                else console.log('Image removed');
            });
        });
    }
}
module.exports = uploadImage;