var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const PORT = 3000;

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
})

var Campground = mongoose.model("Campground",campgroundSchema)

// Campground.create({
//     name:"Manali",
//     image:"https://cdn49.picsart.com/178438877002202.jpg?type=webp&to=crop&r=256",
//     description : "Welcome to manali. Manali is manali and has a lot of manali in it"
//     },(error,campground)=>{
//         if(error){
//             console.log("Something went wrong");
//             console.log(error);
//         }else{
//             console.log("campground added");
//             console.log(campground);
//         }
//     })



app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("landing")
})

app.get("/campgrounds",(req,res)=>{
    //get all camp grounds from db
    Campground.find({},(error,campgrounds)=>{
        if(error){
            console.log("Someting went wrong" + error);
        }
        else{
            res.render("index",{campgrounds:campgrounds})
        }
    })
})

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image
    var description = req.body.description
    var newCampground ={name:name,image:image,description:description}
    //Create new Campground and add to db
    Campground.create(newCampground,(error,campground)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("campgraound added");
            console.log(campground);
            //redirect back to campgrounds
            res.redirect("/campgrounds")
        }
    }) 
})

app.get("/campgrounds/new",(req,res)=>{
    res.render("new")
})

app.get("/campgrounds/:id",(req,res)=>{
    // var id_s = req.param.id
    Campground.findById(req.params.id,(error,foundCampground)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(foundCampground);
            res.render("show",{campground : foundCampground})
        }
    }).exec()
})

app.listen(PORT,()=>{
    console.log(`YelpCamp running at http://localhost:${PORT}`)
})