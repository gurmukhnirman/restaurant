var mongoose=require("mongoose");

const MenuSchema=new mongoose.Schema({
	
	name:String,
	description:String,
    created: {type: Date, default :Date.now},
    price: String,
    category: String
});
module.exports= mongoose.model("Menu",MenuSchema);