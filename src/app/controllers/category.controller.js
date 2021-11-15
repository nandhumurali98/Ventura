const db = require("../models");
const Category = db.category;

exports.create = (req,res)=>{
  if(!req.body.category ){
   return res.status(400).send({message:"Cannot be empty"});
  }
  const category = new Category({
    category:req.body.category,
    category_id:req.body.category,
    image:req.body.image
  });
  category
    .save(category)
    .then(data =>{
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Error Occured while creating the Category"
      });
    });
};
exports.findAll=(req,res)=>{
  const category = req.query.category;
  var condition = category ? { category: { $regex: new RegExp(category), $options:"i"}}:{};

  Category.find(condition)
    .then(data =>{
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
         err.message || "Some error while retrieving the Category"
      });
    });
};
exports.findOne=(req,res)=>{
  const category = req.params.category;

  Category.findByCategory(category)
   .then(data => {
     if(!data)
      res.status(404).send({message:"Not Found!"});
     else res.send(data);
   })
   .catch(err =>{
     res
       .status(500)
       .send({message:"Error retrieving Category"})
   });
};
exports.update=(req,res)=>{
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!"
    });
  }

  const category = req.params.category;

  Category.findByCategoryAndUpdate(category, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category. Maybe Category was not found!`
        });
      } else res.send({ message: "Category updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category"
      });
    });
};
exports.delete=(req,res)=>{
  const category = req.params.category;

  Category.findByCategoryAndRemove(category)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category. Maybe Category was not found!`
        });
      } else {
        res.send({
          message: "Category deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Couldn't delete Category"
      });
    });

};
exports.deleteAll=(req,res)=>{
  Category.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Category deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error occurred while removing all Category."
    });
  });
};
