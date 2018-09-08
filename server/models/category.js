var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    category = new Schema({
        name: {
            type: String
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        }
    }, {
        timestamps: true
    })

category.plugin(mongoosePaginate);
module.exports = mongoose.model('category', category, 'category');