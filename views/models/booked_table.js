var mongoose=require("mongoose");

const BookTableSchema =new mongoose.Schema({
	
	name:String,
	email:String,
    created: {type: Date, default :Date.now},
    phone: String,
    date: String,
    people: Number,
    message: String
});
module.exports= mongoose.model("Booked_table",BookTableSchema);