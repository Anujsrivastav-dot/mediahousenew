var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    cart = new Schema({
        productId: {
            type: ObjectId,
            default: null,
            ref: 'category'
        },
        quantity: Number,
        userId: {
            type: ObjectId,
            default: null,
            ref: 'category'
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }

    }, {
        timestamps: true
    });

cart.plugin(mongoosePaginate);
module.exports = mongoose.model('cart', cart, 'cart');