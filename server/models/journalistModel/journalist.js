var mongoose = require("mongoose"),
  mongoosePaginate = require("mongoose-paginate"),
   mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  journalist = new Schema(
    {
      gID: {type: ObjectId,ref:'mediahouse'},
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
      // categoryId: {
      //   type: ObjectId,
      //   default: null,
      //   ref: "category"
      // },
      profilePic: {
        type: String
      },
      mailingAddress: {
        type: String
      },
      shortVideo: {
        type: String
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
      country: {},
      state: {},
      city: {},
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
      mobileNumber: {
        type: Number
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
      resumeDetails: {
        type: String
      },
      stepCount: {
        type: Number
      },
      uploadResume: {
        type: String
      },
      refrences: [],
      previousWorks: [],
      //   socialAccountLinks: [{
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
      //   }],
      platformBenefits: [
        {
          type: ObjectId,
          default: null,
          ref: "benefit"
        }
      ],
      platformSuggestion: {
        type: String
      },
      paymentStatus: {
        type: Number, //0 for inactive 1 for active
        default: 0
      },
      userType: {
        type: String, //0 for inactive 1 for active
        default: "journalist"
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
  journalist.plugin(mongooseAggregatePaginate);
journalist.plugin(mongoosePaginate);
journalist.index({emailId: "text",firstName: "text"})
module.exports = mongoose.model("journalist", journalist, "journalists");
//module.exports  = mongoose.model('session', session, 'session');
