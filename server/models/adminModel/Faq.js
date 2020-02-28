var mongoose = require("mongoose");
story = new Schema(
    {
      question: {
       type:String
      },
      answers: {
        type: String
      }

    })
  
  
module.exports = mongoose.model("faq", story, "faq");