import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types

const postSchema=new mongoose.Schema({

    title:{
        type:String,
    
        },
    body:{
        type:Number
    },
    photo:{
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