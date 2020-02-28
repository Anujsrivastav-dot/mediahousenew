var mongoose = require("mongoose");
contactus = new Schema(
    {
      name: {
       type:String
      },
      email: {
        type: String
      },
      message: {
        type: String
      }

    })
  
  
module.exports = mongoose.model("contactus", contactus, "contactus");