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
        }
    });

    module.exports = mongoose.model('enquiry', enquiry, 'enquiries');
