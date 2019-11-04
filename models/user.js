const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique:true},
    password:{type:String},
    email:{type:String, required:true, unique:true},
    userId:{
        type:String,index:true,unique:true },
    createdOn :{type:Date,default:""}

});
module.exports = mongoose.model('UserSchema', userSchema);