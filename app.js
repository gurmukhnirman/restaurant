var express                = require("express");
var app                    = express(); 
var mongoose               = require("mongoose");
var bodyParser             = require("body-parser");
const menu                 = require("./views/models/menu");
var seedB                 = require("./seed.js");

//connecting to mongoose
var key1= "nirmangursahib";
mongoose.connect(`mongodb+srv://gurmukh:${key1}@cluster0-4fjef.mongodb.net/test?retryWrites=true&w=majority`,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err => {
	 console.log('ERROR:',err.message);
});

mongoose.set('useFindAndModify', false);

app.set("view engine","ejs");
app.use(express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: true }));


// seedB();

app.get("/",(req,res)=>{
    console.log("showing home page");
    menu.find({},function(err,items){
       if(err)
       console.log('error');
       else
       res.render("index",{items:items});
   });	
})

app.get("/menu/new", (req,res) =>{
    res.render("menu/new");
});

app.post("/menu", (req,res) =>{
    menu.create(req.body.order,(err,post)=>{
        if(err)
        res.redirect('/blogs/new');
        else{
          res.redirect("/");
        }
    });

});

let port= process.env.PORT || 1234;
app.listen(port,() => {
	console.log("server listening on port 1234");
});