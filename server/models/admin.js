var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    admin = new Schema({
        emailId: {
            type: String
        },
        password: {
            type: String
        },
        type: {
            type: String
        },
        restaurantId: {
            type: ObjectId,
            default: null,
            ref: 'restaurant'
        },
        status: {
            type: Number,
            default: 1
        }
    }, {
        timestamps: true
    });


var data = mongoose.model('admin', admin, 'admin');



async function inIt() {
    var success = await data.countDocuments({
        type: 'Admin'
    });
    if (!success) {
        var dataObj = {
            emailId: "admin@gmail.com",
            password: "12345678"
        }
        modelObj = new data(dataObj);
        modelObj.save();
    }

}

inIt();

module.exports = data;