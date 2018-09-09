var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    enquiry = new Schema({
    	name:{
    		type:String
    	},
    	emailId:{
    		type:String
    	},
    	phoneNumber:{
    		type:Number
    	},
    	description: {
            type: String
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        }
    });

    module.exports = mongoose.model('enquiry', enquiry, 'enquiries');
