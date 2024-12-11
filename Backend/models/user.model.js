import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    FirstName:{
        required:true,
        type:String
    },
    LastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model("User",UserSchema)