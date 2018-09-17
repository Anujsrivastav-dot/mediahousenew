var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    enquiry = new Schema({
        name: {
            type: String
        },
        emailId: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        description: {
            type: String
        },
        status: {
            type: Number,
            default: 0 // status 0 is Pending // 1 is Complete // 2 is cancelled
        }
    }, {
        timestamps: true
    });

enquiry.plugin(mongoosePaginate);

module.exports = mongoose.model('enquiry', enquiry, 'enquiries');