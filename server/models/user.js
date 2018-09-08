var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    user = new Schema({
        socialId: {
            type: Number
        },
        accountType: {
            type: String
        },
        deviceToken: {
            type: String
        },
        deviceType: {
            type: String
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
        fullName: {
            type: String
        },
        profilePic: {
            type: String
        },
        notificationStatus: {
            type: Boolean,
            default: 1
        },
        userAddress: {
            type: String,
            trim: true
        },

        address: [{
            title: {
                type: String,
                trim: true
            },
            address: {
                type: String,
                trim: true
            },
            line1: {
                type: String,
                trim: true
            },
            landMark: {
                type: String,
                trim: true
            },
            zipCode: {
                type: Number
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            latLong: {
                type: Object,
                default: {
                    type: 'Point',
                    coordinates: []
                }
            },
            status: {
                type: Number
            }
        }],
        currentAddress: {
            line1: {
                type: String,
                trim: true
            },
            landMark: {
                type: String,
                trim: true
            },
            address: {
                type: String,
                trim: true
            },
            zipCode: {
                type: Number
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            latLong: {
                type: Object,
                default: {
                    type: 'Point',
                    coordinates: []
                }
            }

        },
        status: {
            type: Number,
            default: 1 // status 0 is Active and 1 is Delete
        }
    }, {
        timestamps: true
    });

//    session = new Schema({
//     userId: {
//         type: ObjectId
//         , default: null
//         , ref: 'user'
//     }
//     , authToken: {
//         type: String
//     }
// },{
//     timestamps: true
// });
user.plugin(mongoosePaginate);
module.exports = mongoose.model('user', user, 'users');
//module.exports  = mongoose.model('session', session, 'session');