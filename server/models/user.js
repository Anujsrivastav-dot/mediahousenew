var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    user = new Schema({
        name:{
            type:String
        },
        emailId: {
            type: String
        },
        password: {
            type: String 
        },
        phoneNumber: {
            type: Number
        },
        address: {
            type:String
        }                   
},{
    timestamps:true
});

user.plugin(mongoosePaginate);
module.exports = mongoose.model('user', user, 'users');
//module.exports  = mongoose.model('session', session, 'session');