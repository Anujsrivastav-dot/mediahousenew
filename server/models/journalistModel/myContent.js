var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    myContents = new Schema({
        myContent: [{
            type: String
        }],
       
    },{
        timestamps:true
    })

myContents.plugin(mongoosePaginate);
module.exports = mongoose.model('myContents', myContents, 'myContents');