import mongoose from "mongoose";


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        
        },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
 
})


const User=mongoose.model('userpost',userSchema)

export default User