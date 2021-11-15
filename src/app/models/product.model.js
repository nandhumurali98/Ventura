const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    category:String,
    category_id:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    name:String,
    image_path:String,
    price:Number
  })
);
module.exports=Product;
