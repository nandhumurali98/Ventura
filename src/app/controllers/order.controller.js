const db = require("../models");
const Order = db.order;

exports.create = (req,res)=>{
  if(!req.body.name){
   return res.status(400).send({message:"Cannot be empty"});
  }
  const order = new Order({
    name:req.body.name,
    address:req.body.address,
    mobile:req.body.mobile,
    email:req.body.email,
    product_name:req.body.product_name,
    total_price:req.body.total_price
  });
  order
    .save(order)
    .then(data =>{
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Error Occured while creating the Order"
      });
    });
};
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Order.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};
exports.findOne=(req,res)=>{
  const id = req.params.id;

  Order.findById(id)
   .then(data => {
     if(!data)
      res.status(404).send({message:"Not Found!"});
     else res.send(data);
   })
   .catch(err =>{
     res
       .status(500)
       .send({message:"Error retrieving Order"})
   });
};
exports.update=(req,res)=>{
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!"
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order. Maybe Order was not found!`
        });
      } else res.send({ message: "Order updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order"
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params._id;

  Order.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      } else {
        res.send({
          message: "Order was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};exports.deleteAll=(req,res)=>{
  Order.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Order deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error occurred while removing all Orders."
    });
  });
};
