var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    order = new Schema({
        userId: {
            type: ObjectId,
            ref: 'user'
        },
        resturantId: {
            type: ObjectId,
            ref: 'restaurant'
        },
        productId: {
            type: ObjectId,
            ref: 'item'
        },
        caterogyId: {
            type: ObjectId,
            ref: 'category'
        },
        ingridents: [{
            ingridentsId: {
                type: ObjectId
            },
            count: {
                type: Number
            }
        }],
        specialRequest: {
            type: String
        },
        totalPrice: {
            type: Number
        },
        deliveryAddressId: {
            type: ObjectId
        },
        promoCodeId: {
            type: ObjectId
        },
        payAmount: {
            type: Number
        },
        paymentMode: {
            type: String // COD | Paypal | Credit/Debit Card
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        }
    }, {
        timestamps: true
    });
module.exports = mongoose.model('order', order, 'order');