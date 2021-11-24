const { profile } = require("../models");

module.exports = app => {
  const profiles = require("../controllers/profile.controller");

 var router = require("express").Router();

  router.post("/",profiles.create);

  router.get("/", profiles.findAll);

  router.get("/:id", profiles.findOne);

  router.put("/:id", profiles.update);


  router.delete("/:id", profiles.delete);

  router.delete("/", profiles.deleteAll);

  app.use('/api/profiles', router);

}
