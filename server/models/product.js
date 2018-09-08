var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    product = new Schema({
        
        categoryId: {
            type: ObjectId,
            default: null,
            ref: 'category'
        },
        image: [],
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }
    });

product.plugin(mongoosePaginate);
module.exports = mongoose.model('product', product, 'products');