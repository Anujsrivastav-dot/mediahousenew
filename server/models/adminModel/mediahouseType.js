 var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    mediahouseType = new Schema({
        mediahouseTypeName: {
            type: String
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }
    },{
        timestamps:true
    })

mediahouseType.plugin(mongoosePaginate);
module.exports = mongoose.model('mediahouseType', mediahouseType, 'mediahouseType');