const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

let User = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String},
    role:{type:String,default:'user'}
});

User.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
module.exports = mongoose.model("User",User);