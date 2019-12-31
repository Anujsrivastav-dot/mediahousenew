var mongoose = require('mongoose'),
    // mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    story = new Schema({
        headLine: {
            type: String
        },
        categoryId: {
            type: ObjectId,
            default: null,
            ref: 'category'
        },
        keywordId:[
            {
            type:ObjectId,
            default:null,
            ref:'storyKeyword'
         }
       ],
        langName:{
            type:String
        },
        langCode: {
            type: String
        },
        date: {
            type: Date
        },
        country:{
            type:String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        briefDescription: {
            type: String
        },
        pincode: {
            type: String
        },
        currency: {
            type: String
        },
        shortBio: {
            type: String
        },
        password: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        uploadTexts: [{
            type: String
        }],
        uploadImages: [{
            type: String
        }],
        uploadVideos: [{
            type: String
        }],
        uploadThumbnails: [{
            type: String
        }],
        supportingDocs: [{
            type: String
        }],
        uploadAudios: [{
            type: String
        }],
        currency: [{
            type: String
        }],
        price: {
            type: String
        },
        collaboration: {
            type: Boolean,
            default: false
        },
        purchasingLimit: {
            type: String
        },
        status: {
            type: Number,
            default: ''   // 0 for inactive 1 for pending 2 for active
        }
    }, {
        timestamps: true
    });




// story.plugin(mongoosePaginate);
module.exports = mongoose.model('story', story, 'stories');
//module.exports  = mongoose.model('session', session, 'session');