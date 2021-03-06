var mongoose = require("mongoose");
mongoosePaginate = require('mongoose-paginate'),
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
story = new Schema(
  {
    journalistId: {
      type: ObjectId,
      default: null,
      ref: "journalists"
    },
    headLine: {
      type: String
    },
    categoryId: {
      type: ObjectId,
      default: null,
      ref: "category"
    },
    storyCategory: {
      type: String,
      default: null
    },
    keywordId: [
      {
        type: ObjectId,
        default: null,
        ref: "storyKeyword"
      }
    ],
    langCode: {
      type: String,
      default: null
    },
    date: {
      type: Date
    },
    country: {},
    state: {},
    city: {},
    briefDescription: {
      type: String
    },
    pincode: {
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
    uploadTexts: [
      {
        text: {
          type: String
        },
        textNote: {
          type: String
        }
      }
    ],
    uploadImages: [
      {
        Image: {
          type: String
        },
        imageNote: {
          type: String
        }
      }
    ],
    uploadVideos: [
      {
        video: {
          type: String
        },
        videoNote: {
          type: String
        }
      }
    ],
    uploadThumbnails: [
      {
        thumbnale: {
          type: String
        },
        thumbnaleNote: {
          type: String
        }
      }
    ],
    supportingDocs: [
      {
        doc: {
          type: String
        },
        docNote: {
          type: String
        }
      }
    ],
    uploadAudios: [
      {
        audio: {
          type: String
        },
        audioNote: {
          type: String
        }
      }
    ],
    currency: {
      type: String,
      default: null
    },
    price: {
      type: String,
      default: null
    },
    collaborationGroupId: {
      type: String,
      default: null
    },
    purchasingLimit: {
      type: String,
      default: null
    },
    auctionDuration: {
      type: String,
      default: null
    },
    auctionBiddingPrice: {
      type: String,
      default: null
    },
    status: {
      type: Number,
      default: 0 // 0 for inactive 1 for active
    },
    typeStatus: {
      type: Number,
      default: 0 // 0 for save story 1 for post story
    },
    stepCount: {
      type: Number
    },
    collaboratedStatus: {
      type: Number,
      default: 0 // 0 for inactive 1 for pending 2 for active
    }
  },
  {
    timestamps: true
  }
);

story.plugin(mongoosePaginate);
module.exports = mongoose.model("story", story, "stories");
//module.exports  = mongoose.model('session', session, 'session');
