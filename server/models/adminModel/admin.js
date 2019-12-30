var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    admin = new Schema({

        file: [{
            type: String
        }],
        video: [{
            type: String
        }],
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }
    }, {
        timestamps: true
    })

admin.plugin(mongoosePaginate);
module.exports = mongoose.model('admin', admin, 'admin');