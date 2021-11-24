const db = require("../models");
const Profile = db.profile;

exports.create = (req,res)=>{
  if(!req.body.name){
    return res.status(400).send({message:"Cannot be empty"});
  }
  const profile = new Profile({
    name:req.body.name,
    address:req.body.address,
    mobile:req.body.mobile,
    email:req.body.email,
    user_id:req.body.user_id
  });
  profile
    .save(profile)
    .then(data => {
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Error Occured while creating the profile"
      });
    });
};
exports.findAll = (req,res)=>{
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(category), $options: "i"} }: {};

  Profile.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error while retrieving the profile"
      });
    });
};
exports.findOne=(req,res)=>{
  const id = req.params.id;

  Profile.findById(id)
   .then(data => {
     if(!data)
      res.status(404).send({message:"Not Found!"});
     else res.send(data);
   })
   .catch(err =>{
     res
       .status(500)
       .send({message:"Error retrieving profile"})
   });
};
exports.update=(req,res)=>{
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!"
    });
  }

  const id = req.params.id;

  Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile. Maybe Profile was not found!`
        });
      } else res.send({ message: "Profile updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile"
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params._id;

  Profile.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
        });
      } else {
        res.send({
          message: "Profile was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id
      });
    });
};exports.deleteAll=(req,res)=>{
  Profile.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Profile deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error occurred while removing all Profiles."
    });
  });
};
