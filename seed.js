var mongoose               =require("mongoose");
var menu                   =require("./views/models/menu");



function seedB(){
    menu.remove({},(err)=>{
      if(err) console.log("not removed");
      else console.log("successfully removed");
    });
}


module.exports = seedB;