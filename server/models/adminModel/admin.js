var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    admin = new Schema({
        file:{type:String},
        firstName:{type:String},
        middleName:{type:String},
        lastName:{type:String},
        adminName: {
            type: String
        },
        adminEmail: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: Number,
            default: 0 // status 1 is Active and 0 is inActive/delete
        }
    }, {
        timestamps: true
    })

 admin.plugin(mongoosePaginate);
module.exports = mongoose.model('admin', admin, 'admin');