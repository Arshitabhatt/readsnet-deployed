const express = require("express");
      app = express();
      var fs = require('fs');
      cors = require('cors');
      bodyParser = require("body-parser");
      mongoose = require("mongoose");
      fileUpload = require('express-fileupload');
      cloudinary = require("cloudinary").v2;
      require('dotenv').config()
      Event = require("./models/upcomingevents")
      Twiceread = require("./models/twiceread")
      Single = require("./models/single")
      Caraousel = require("./models/caraousel")

      app.use(fileUpload({
        useTempFiles:true,
       
      }));

      cloudinary.config({ 
        cloud_name: 'readsnet', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
     
      
      app.use(express.json());
      app.use(cors());
      app.set("view engine", "ejs");
      app.use(bodyParser.urlencoded({extended: true}));

      // mongoose.connect("mongodb+srv://thranduil:2m6KVbbi9W4Wn1kp@cluster0-66agq.gcp.mongodb.net/test?retryWrites=true&w=majority",{
      mongoose.connect("mongodb+srv://readsnet:68UMAcJJSudvh2sj@cluster0-lykho.gcp.mongodb.net/test?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(()=>{
        console.log("Connected to db");
    }).catch(err=>{
        console.log("error:", err.message);
    })


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


//POST ROUTE 
app.post("/upcoming", function(req, res){
    if (req.files === undefined) {
        return res.status(400).json('No file uploaded');
      }
    else{
      const file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
        if(err){
          console.log("Error: " , err);
          res.json(err);
        }
        console.log("Result:",  result);
            req.files.file= result;
            var evt = new Event;
            evt.file = result.secure_url;
            evt.name = req.body.name;
            evt.description = req.body.description;
            evt.date = req.body.date;
            evt.time = req.body.time;
            evt.org = req.body.org;
            evt.orgurl = req.body.orgurl;
            evt.city = req.body.city;
            evt.payment = req.body.payment;
            evt.save(function (err, evt) {
              if (err) {
                  console.log(err);
                  res.json("replay");
              } else{
                res.json('Event added successfully');
                console.error('saved img to mongo');
              }
            }) 
          });
        }
      });


// TWICE READ GET ROUTE
app.get("/twiceread", (req,res)=>{
  Twiceread.find({}, (err, twicereads)=>{
    if(err){
        console.log(err);
    } else{
        res.json(twicereads);
    }
    });
})



// TWICE READ POST ROUTE
app.post("/twiceread/add", (req,res)=>{
  var twr = new Twiceread ;
    twr.sliderimg1  =  req.body.img1,
    twr.sliderimg2  =  req.body.img2,
    twr.sliderimg3  =  req.body.img3,
    twr.name        =  req.body.name,
    twr.description =  req.body.description,
    twr.location    =  req.body.location,
    twr.href        =  req.body.href
    twr.save( (err, twr) => {
      if (err) {
          console.log(err);
      } else{
        res.json('twice read event added successfully');
      console.error('event added and saved images to mongodb');
      }
    }) 
})


app.get('/twiceread/:id', function(req, res){
  // console.log("the id is ",req.params.id);
  Twiceread.findById(req.params.id).populate("single").exec(function(err, foundTwiceread){
    if(err){
      console.log(err);
  } else{
      res.json(foundTwiceread);
  }
  }); 
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// GET


//GET ROUTE 
app.get("/caraousel", (req, res) => {
  Caraousel.find({}, (err, images)=>{
    if(err){
        console.log(err);
    } else{
        res.json(images);
    }
  });
});

app.post("/caraousel",(req, res) =>{
  var caraimg = new Caraousel
  caraimg.cara1 =  req.body.cara1,
  caraimg.cara2  =  req.body.cara2,
    caraimg.save((err, img) => {
      if (err) {
          console.log(err);
      } else{
        res.json('Caraousel images are on');
      }
  })
})

// POST COMMENT
app.post("/twiceread/:id/single", function(req, res){
  // look up campground
  Twiceread.findById(req.params.id, function(err, twiceread){
      if(err){
          console.log(err);
          res.json(err);
          //res.redirect("/campgrounds");
      }else{
        var profile1 = req.body.profile1;
        var profile2 = req.body.profile2;
        var profile3 = req.body.profile3;
        var profile4 = req.body.profile4;
        var book1 = req.body.book1;
        var book2 = req.body.book2;
        var book3 = req.body.book3;
        var book4 = req.body.book4;
        var book5 = req.body.book5;
        var book6 = req.body.book6;
        var blog = req.body.blog;
        var link1 = req.body.link1;
        var link2 = req.body.link2;

        var newDetails = {
           profile1 : profile1,
           profile2 : profile2,
           profile3 : profile3,
           profile4 : profile4,
           book1 : book1,
           book2 : book2,
           book3 : book3,
           book4 : book4,
           book5 : book5,
           book6 : book6,
            blog: blog,
            link1: link1,
            link2:link2
        }

        Single.create(newDetails, (err, addedDetails) =>{
          if(err){
            console.log(err);
          }
          else{
            twiceread.single.push(addedDetails);
            twiceread.save( (err, detail) => {
              if (err) {
                  console.log(err);
              } else{
                res.json('twice read event details are added');
              }
            }) 

          }
        });
      }
  });
});


app.listen(5000, ()=>{
  console.log('http://localhost:5000')
});