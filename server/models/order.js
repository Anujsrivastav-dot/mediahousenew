var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    order = new Schema({
        userId: {
            type: ObjectId,
            ref: 'user'
        },
        productId: {
            type: ObjectId,
            ref: 'item'
        },
        quantity: {
            type: Number
        },
        totalAmount: {
            type: Number
        },
        orderId: {
            type: String
        },

        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        },
        deliveryDate: {
            type: Date
        },
        estimatedDeliveryDate: {
            type: Date
        }
    });
module.exports = mongoose.model('order', order, 'order');