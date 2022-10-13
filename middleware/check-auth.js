import  Jwt  from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/userM.js'

const auth = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error:"only auth"})
    }
    const token = authorization.replace("Bearer ","")
    Jwt.verify(token,"i am markand",(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"only auth user"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}
export default auth