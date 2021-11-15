const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app=express();

var corsOptions={
  origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.json({message:"Welcome"});
});

const db = require("./src/app/models");
const dbConfig=require("./src/app/config/db.config");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>{
    console.log("Conneted to the database!");
    initial();
  })
  .catch(err=>{
    console.log("Cannot connect to the database!");
    process.exit();
  });

  require("./src/app/routes/auth.routes")(app);
  require("./src/app/routes/user.routes")(app);
  require("./src/app/routes/product.routes")(app);
  require("./src/app/routes/category.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}.`);
});

function initial(){
  Role.estimatedDocumentCount((err, count)=>{
    if(!err && count === 0) {
      new Role({
        name:"user"
      }).save(err => {
        if(err){
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
                name: "admin"
               }).save(err => {
                 if (err) {
                   console.log("error", err);
                 }
                 console.log("added 'admin' to roles collection");
               });
             }
           });
    }
