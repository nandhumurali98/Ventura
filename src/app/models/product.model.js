 const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Product'
        }],
    category:String,
    category_id:[{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:'Category'
                }],
    name:String,
    image_path:String,
    price:Number
  })
);
module.exports=Product;

// module.exports = mongoose => {
//   var schema = mongoose.Schema(
//     {
//       category:String,
//      category_id:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
//      name:String,
//     image_path:String,
//     price:Number
//     },{
//       timestamps:true
//     }
//   );
//   schema.method("toJSON", function(){
//     const { __v,_id,...object} = this.toObject();
//     object.id = _id;
//     return object;
//   });
//   const Product = mongoose.model("product", schema);
//   return Product;
// };
