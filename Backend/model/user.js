import mongoose from "mongoose";
import passportLocalMongoose  from 'passport-local-mongoose'

const userSchema =new mongoose.Schema( {

    username:String,
    email:String,
    password:Number

});

userSchema.plugin(passportLocalMongoose);

const User  = mongoose.model('user',userSchema);

export default User;