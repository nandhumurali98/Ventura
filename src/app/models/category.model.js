const mongoose = require("mongoose");
const Category = mongoose.model(
  "Categories",
  new mongoose.Schema({
    category_id:Number,
    category:String,
    image:String
  })
);
module.exports=Category;
