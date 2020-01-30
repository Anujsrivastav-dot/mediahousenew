var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate"),
  ObjectId = Schema.ObjectId,
  favouriteStory = new Schema(
    {
      journalistId: {
        type: ObjectId,
        default: null,
        ref: "journalists"
      },
      storyId: {
        type: ObjectId,
        default: null,
        ref: "stories"
      },
      status: {
        type: Number,
        default: 1 // status 1 is favourite and 0 is unfavourite
      }
    },
    {
      timestamps: true
    }
  );
favouriteStory.plugin(mongoosePaginate);
module.exports = mongoose.model(
  "favouriteStory",
  favouriteStory,
  "favouriteStory"
);
