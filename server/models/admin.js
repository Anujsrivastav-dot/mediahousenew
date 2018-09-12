var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    admin = new Schema({
        name: {
            type: String
        },
        emailId: {
            type: String
        },
        password: {
            type: String
        },
        address: {
            type: String
        }
    });


var data = mongoose.model('admin', admin, 'admin');



async function inIt() {
    var success = await data.countDocuments({});
    if (!success) {
        var dataObj = {
            emailId: "admin@gmail.com",
            password: "12345678",
            name: "admin",
            address: "noida sector 15 new delhi"
        }
        modelObj = new data(dataObj);
        modelObj.save();
    }

}

inIt();

module.exports = data;