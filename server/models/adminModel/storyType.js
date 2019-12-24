var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    storyType = new Schema({
        storyName:{
            type:String
        },
        status: {
            type: Number,
            default: ''   // 0 for inactive 1 for pending 2 for active
        }                   
},{
    timestamps:true
});

module.exports = mongoose.model('storyType', storyType, 'storyTypes');
//module.exports  = mongoose.model('session', session, 'session');