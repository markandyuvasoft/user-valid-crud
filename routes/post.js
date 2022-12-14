import  express  from "express";
import Post from '../models/postM.js'
import auth from "../middleware/check-auth.js";
import User from "../models/userM.js";


const router=express.Router()

//post method start......................................
router.post("/post",auth,async(req,res,next)=>{

    const {  name, age ,city } = req.body;

    if(!name || !age || !city )
    {
        res.status(400).send({error:"plz fill the data"})
    } else{

        req.user.password= undefined          // password ko show nhi krwane ke ley
        

        const user = new Post({
            // name,age,city,postedby:req.user         //req.user me user login ki details hai
            name,age,city,postedby:req.user         //req.user me user login ki details hai

        })
        user.save().then(()=>{
    
        res.status(201).send(user)
    
        }).catch((err)=>{
      
        res.status(400).send(err)
    
        }) 
    }
  })
//post method end......................................


router.get("/get",auth,async(req,res)=>{

    try{

    const get= await  Post.find({postedby:req.user._id}) .populate("postedby", "_id name")

    res.status(201).send(get)
    }
    catch(err)
    {
    res.status(400).send(err)
    }
})

router.get("/get/:id",async(req,res)=>{

    try{
     
        const _id= req.params.id

     const getid= await Post.findById(_id)

     res.status(201).send(getid)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})

router.put("/update/:id",async(req,res)=>{

    
    try{
     
        const _id= req.params.id

     const getid= await Post.findByIdAndUpdate(_id,req.body,{

        new:true
     })

     res.status(201).send(getid)
    }
    catch(err)
    {
        res.status(500).send(err)
    }

})


router.delete("/delete/:id",auth,async(req,res)=>{

        try{
            const _id= req.params.id
    
            const del= await Post.findByIdAndDelete(_id)

    
    
            res.status(200).send({message: "your data is delete"})
        }
        catch(err)
        {
            res.status(500).send(err)
        }
    })
//delete method end......................................


export default router

