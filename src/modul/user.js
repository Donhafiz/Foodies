const mongoose=require('mongoose');
const User=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    address:String,
    type:String,
}, {timeStamp: true})
module.exports=mongoose.model("user",User);