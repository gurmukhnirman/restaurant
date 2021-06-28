var express                = require("express");
var app                    = express(); 
var mongoose               = require("mongoose");
var bodyParser             = require("body-parser");
var firebase               = require("firebase");
const menu                 = require("./views/models/menu");
const booked_tables        = require("./views/models/booked_table");
const User                 = require("./views/models/user");
var seedB                  = require("./seed.js");


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


//initializing the firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3aB_oPCCi4HIjX20Sf96usLeHMKjyFDE",
    authDomain: "restaurant-website-9484b.firebaseapp.com",
    projectId: "restaurant-website-9484b",
    storageBucket: "restaurant-website-9484b.appspot.com",
    messagingSenderId: "630755178148",
    appId: "1:630755178148:web:1e9505c3c2d32dbf0e1831",
    measurementId: "G-SL0XRZGCWZ"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
    console.log("came to the menu get route");
    res.render("forms/new");
});

app.post("/menu", (req,res) =>{
    menu.create(req.body.order,(err,post)=>{
        if(err)
        res.redirect('forms/new');
        else{
          res.redirect("/");
        }
    });

});

app.get("/getmenu",(req,res)=>{
    res.render("getmenu");
})


app.get("/book_table",(req,res)=>{
     res.render("forms/book_table");
});

app.post("/book_table",(req,res)=>{
     console.log("came to the book table post route");
     console.log(req.body.data);
     booked_tables.create(req.body.data,(err,post)=>{
        if(err)
        res.redirect('book_table');
        else{
          res.redirect("/");
        }
    });
});

// contact us form

app.get('/contact',(req,res)=>{
    res.render("forms/contactUs");
});

// auth routes

// signup routes
app.get("/signup",(req,res)=>{
    res.render("forms/signup");
})

app.post("/signup",(req,res)=>{
    var email    = req.body.email;
    var password = req.body.password;

    console.log(email,password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
       console.log("sucecssfully signed up");
       
       var user= { 
           userName: req.body.username,
           fullName: req.body.fullname,
           email: req.body.email,
           userId: userCredential.user.uid
        }
       User.create(user)
           .then(created_user =>{
                console.log("user successfully created in database");
                res.redirect("/");
           }).catch(err =>{
                console.log("FAILED TO CREATE A USER IN SIGNUP ROUTE", err.message);
           })
     })
     .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode,errorMessage);

       res.render("forms/signup");
   });
});

// login routes

app.get("/login",(req,res)=>{
   res.render("forms/login");
});

app.post("/login", (req,res)=>{
    var email    = req.body.email;
    var password = req.body.password;

    console.log(email,password);

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log("you are signed in");

    res.redirect("/");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    res.redirect("/login");
  });

})


let port= process.env.PORT || 1234;
app.listen(port,() => {
	console.log("server listening on port 1234");
});