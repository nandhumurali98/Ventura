const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile", new mongoose.Schema({
    user_id:[String],
    id:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Profile'
        }],
    name:String,
    address:String,
    mobile:Number,
    email:String
  })
);
module.exports = Profile;
