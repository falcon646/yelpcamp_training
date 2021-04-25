var express = require('express')
var app = express()
var bodyParser = require('body-parser')

const PORT = 3000;

var campgrounds = [
    {name:"Pahad 1",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 2",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 3",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 2",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 2",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 2",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"},
    {name:"Pahad 2",image:"https://icon-library.com/images/small-fb-icon/small-fb-icon-0.jpg"}

]


app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("landing")
})

app.get("/campgrounds",(req,res)=>{
    
    res.render("campgrounds",{campgrounds:campgrounds})
})

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image
    var newCampground ={name:name,image:image}
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new",(req,res)=>{
    res.render("new")
})

app.listen(PORT,()=>{
    console.log(`YelpCamp running at http://localhost:${PORT}`)
})