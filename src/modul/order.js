const mongoose=require('mongoose');
const order=mongoose.Schema({
    dishId:String,
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time:String,
    photo:String,
    dname:String,
    price:Number,
    quantity:Number,
    paymentType:String,
    states:String,
    user:Object,


}, {timeStamp: true})
module.exports=mongoose.model("orders",order)