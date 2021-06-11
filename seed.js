var mongoose               = require("mongoose");
var menu                   = require("./views/models/menu");
const booked_tables        = require("./views/models/booked_table");

function seedB(){
    booked_tables.remove({},(err)=>{
      if(err) console.log("orders removed");
      else{
        console.log("successfully removed");
      }
    });
}


module.exports = seedB;