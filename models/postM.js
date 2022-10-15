import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types

const postSchema=new mongoose.Schema({

    name:{
        type:String,
    
        },
    age:{
        type:Number
    },
    city:{
        type:String,
        default:"no photo"
    },  
    postedby:{
        type:ObjectId,
        ref:"userpost"
        },

})


const post=mongoose.model('like',postSchema)

export default post