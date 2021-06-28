var mongoose=require("mongoose");

const UserSchema =new mongoose.Schema({
	UserName:String,
	email: String,
    userId: String,
    fullName: String
});
module.exports= mongoose.model("User",UserSchema);