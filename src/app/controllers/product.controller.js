const db = require("../models");
const Product = db.product;

exports.create = (req,res)=>{
  if(!req.body.name && !req.body.category){
   return res.status(400).send({message:"Cannot be empty"});
  }
  const product = new Product({
    category:req.body.category,
    category_id:req.body.category,
    name:req.body.name,
    image_path:req.body.image_path,
    price:req.body.price
  });
  product
    .save(product)
    .then(data =>{
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Error Occured while creating the Product"
      });
    });
};
exports.findAll=(req,res)=>{
  const category = req.query.category;
  var condition = category ? { category: { $regex: new RegExp(category), $options:"i"}}:{};

  Product.find(condition)
    .then(data =>{
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
         err.message || "Some error while retrieving the Product"
      });
    });
};
exports.findOne=(req,res)=>{
  const name = req.params.name;

  Product.findByName(name)
   .then(data => {
     if(!data)
      res.status(404).send({message:"Not Found!"});
     else res.send(data);
   })
   .catch(err =>{
     res
       .status(500)
       .send({message:"Error retrieving Product"})
   });
};
exports.update=(req,res)=>{
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!"
    });
  }

  const name = req.params.name;

  Product.findByNameAndUpdate(name, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product. Maybe Product was not found!`
        });
      } else res.send({ message: "Product updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product"
      });
    });
};
exports.delete=(req,res)=>{
  const name = req.params.name;

  Product.findByNameAndRemove(name)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Couldn't delete Product"
      });
    });

};
exports.deleteAll=(req,res)=>{
  Product.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Product deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error occurred while removing all products."
    });
  });
};
