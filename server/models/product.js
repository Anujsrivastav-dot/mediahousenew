var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    product = new Schema({
        restaurantId: {
            type: ObjectId,
            default: null,
            ref: 'restaurant'
        },
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
        avgCookingTime: {
            type: String
        },
    currency: {
            type: String // AED
        },
        ingridients: [{
            name: {
                type: String
            },
            price: {
                type: Number
            },
            maxlimit: {
                type: Number
            }
        }],
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        }
    }, {
        timestamps: true
    });

product.plugin(mongoosePaginate);
module.exports = mongoose.model('product', product, 'product');