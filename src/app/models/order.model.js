const mongoose = require("mongoose");

const Order =mongoose.model(
  "Order", new mongoose.Schema({
     name:String,
     address:String,
     mobile:Number,
     email:String,
     total_price:Number,
     product_name:[String],
     id:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
     }
    ],
     user_id:[String]
  })
);
module.exports=Order;
