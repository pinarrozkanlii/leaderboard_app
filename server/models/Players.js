const mongoose = require('mongoose');
const {schema} = mongoose;

const articleSchema=new Schema({
    username:String,
    total_money:int,
    country:String
},{timestamps:true});

const Players=mongoose.model('User','UserSchema');
module.exports=Players;