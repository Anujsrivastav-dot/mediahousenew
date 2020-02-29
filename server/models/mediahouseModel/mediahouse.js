var mongoose = require("mongoose"),
  // mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema,
  mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
mongoosePaginate = require('mongoose-paginate'),

  ObjectId = Schema.ObjectId,
  mediahouse = new Schema(
    {
      Mid: {type:Schema.Types.ObjectId,ref:'journalists' },
      langCode: {
        type: String
      },
      langName: {
        type: String
      },
      designationId: {
        type: ObjectId,
        default: null,
        ref: "designation"
      },
      profilePic: {
        type: String
      },
      logo: {
        type: String
      },
      organizationName: {
        type: String
      },
      mediahouseTypeId: {
        type: ObjectId,
        default: null,
        ref: "mediahouseType"
      },
      firstName: {
        type: String
      },
      middleName: {
        type: String
      },
      lastName: {
        type: String
      },
      emailId: {
        type: String
      },
      mobileNumber: {
        type: String
      },
      country: {
        type: String
      },
      state: {
        type: String
      },
      city: {
        type: String
      },
      pinCode: {
        type: String
      },
      password: {
        type: String
      },
      shortBio: {
        type: String
      },
      mailingAddress: {
        type: String
      },
      otp: {
        type: Number
      },
      verifyOtp: {
        type: Boolean,
        default: false
      },
      areaOfInterest: [
        {
          type: ObjectId,
          default: null,
          ref: "category"
        }
      ],
      targetAudience: [
        {
          type: String
        }
      ],
      frequencyId: [
        {
          type: ObjectId,
          default: null,
          ref: "mediahouseFrequency"
        }
      ],
      keywordId: [
        {
          type: ObjectId,
          default: null,
          ref: "storyKeyword"
        }
      ],
      website: {
        type: String
      },
      audience: {
        type: String
      },
      stepCount: {
        type: Number
      },
      prevData:{
        type:String
      },
      prevJouralistData:{
        type:String
      },
      facebookLink: {
        type: String
      },
      twitterLink: {
        type: String
      },
      linkedinLink: {
        type: String
      },
      snapChatLink: {
        type: String
      },
      instagramLink: {
        type: String
      },
      youtubeLink: {
        type: String
      },
      userType: {
        type: String, //0 for inactive 1 for active
        default: "mediahouse"
      },
      status: {
        type: Number,
        default: 0 // 0 for inactive 1 for pending 2 for active
      }
    },
    {
      timestamps: true
    }
  );

// journalist.plugin(mongoosePaginate);
mediahouse.plugin(mongooseAggregatePaginate)
mediahouse.plugin(mongoosePaginate);
module.exports = mongoose.model("mediahouse", mediahouse, "mediahouse");
//module.exports  = mongoose.model('session', session, 'session');
