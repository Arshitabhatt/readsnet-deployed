const express = require("express");
      app = express();
      bodyParser = require("body-parser");
      mongoose = require("mongoose");
      fileUpload = require('express-fileupload');
      cloudinary = require("cloudinary").v2;
      require('dotenv').config()

      app.use(fileUpload({
        useTempFiles:true
      }));

      cloudinary.config({ 
        cloud_name: 'seeker317', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
     
      
      app.use(express.json());
      app.set("view engine", "ejs");
      app.use(bodyParser.urlencoded({extended: true}));

      mongoose.connect("mongodb+srv://thranduil:2m6KVbbi9W4Wn1kp@cluster0-66agq.gcp.mongodb.net/test?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(()=>{
        console.log("Connected to db");
    }).catch(err=>{
        console.log("error:", err.message);
    })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //MODELS
const eventSchema = new mongoose.Schema({
    eventimage: {

    },
    name: String,
    description: String,
});
const Event = mongoose.model("Event", eventSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GET ROUTE
app.get("/upcoming", (req, res)=>{
    Event.find({}, (err, allEvent)=>{
    if(err){
        console.log(err);
    } else{
        res.json(allEvent);
    }
    });
});


//POST ROUTER
app.post("/upcoming", function(req, res){
    cloudinary.uploader.upload(req.files.eventimage.tempFilePath, (err, result)=>{
        if(err){
            console.log("Error: " , err);
        }
        else{
            console.log("Result:",  result);
            // res.json({ fileName: result.original_filename, filePath:result.secure_url });
            req.files.eventimage = result;
            
        }
        
      })

            var name = req.body.name;
            var description = req.body.description;
                eventimage = req.files.eventimage;

   
   var newEvent ={name: name, description:description, eventimage:eventimage}
   Event.create(newEvent,function(err, newlyCreated){
        if(err){
        console.log(err);
    }
        else{
            res.json('event added');
        }    
   });

});

// app.post("/upcoming", function(req, res) {
//     const eventimage = req.files.eventimage;
//         cloudinary.uploader.upload(eventimage.tempFilePath, (err, result)=>{
//             if(err){
//                 console.log("Error: " , err);
//             }
//             else{
//                 console.log("Result:",  result);
//                 // res.json({ fileName: result.original_filename, filePath:result.secure_url });
//                 req.body.eventimage = result.secure_url;
//             }
            
//           })
        
//         Event.create(req.body.event, function(err, event) {
//             if(err){
//                 console.log(err);
//             }
//                 else{
//                     res.json('event added');
//                 } 
//         });
//       });




//submit event
app.post("/upcoming/add", function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var eventimage = req.files.eventimage;
    cloudinary.uploader.upload(eventimage.tempFilePath, (err, result)=>{
        if(err){
            console.log("Error: " , err);
        }
        else{
            console.log("Result:",  result);
            // res.json({ fileName: result.original_filename, filePath:result.secure_url });
            
            var eventimage = result.secure_url;
        }
        
      })
  
    const newEvent = new Event({
      name,
      description,
      eventimage
    });
  
    newEvent.save()
    .then(() => res.json("added"))
    .catch(err => res.status(400).json('Error: ' + err));
  });


app.listen(5000, ()=>{
    console.log('http://localhost:5000')
});