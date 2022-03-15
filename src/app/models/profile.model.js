const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile", new mongoose.Schema({
    name:String,
    address:String,
    mobile:Number,
    email:String,
    user_id:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
id:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Profile'
   }]
  })
);
module.exports = Profile;
