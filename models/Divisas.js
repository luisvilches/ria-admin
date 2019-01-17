const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Divisa = new Schema({
    name:{type:String,required:true},
    valor1:{type:String,default:''},
    valor2:{type:String,default:''},
})

module.exports = mongoose.model('Divisa',Divisa);