import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import User from "../models/userM.js";
import auth from '../middleware/check-auth.js'


const userrouter=express.Router()


//....................................USER REGISTER START.............................................................................................

userrouter.post("/register", async (req, res) => {

    const { name, email, password, } = req.body;
  
    if (
      !name || !email || !password 
      
    ) {
      return res.status(422).json({ error: " plzz filled the field propraly" });
    } 
    try {
      const userExist =await  User.findOne({ email: email });
  
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }  else {
        const hash=await bcrypt.hash(password,10)

        const user = new User({
            name:name,
            email:email,
            password:hash,
        });
  
        const userRegister = await user.save();
  
        res.status(201).json({ message: "user register successfully" });
      }
    } catch (err) {
      console.log(err);
    }

  });
//....................................USER REGISTER END.............................................................................................
  

//.................USER LOGIN START.................................................................................................................
userrouter.post('/login',(req,res,next)=>{

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               const token = Jwt.sign({_id:savedUser._id},"i am markand")
               const {_id,name,email} = savedUser
               res.send({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).send({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
//.................USER LOGIN END.................................................................................................................


export default userrouter;
