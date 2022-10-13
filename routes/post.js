import  express  from "express";
import Post from '../models/postM.js'
import auth from "../middleware/check-auth.js";


const router=express.Router()

//post method start......................................
router.post("/post",auth,async(req,res,next)=>{

    const { title, body } = req.body;

    if(!title || !body )
    {
        res.status(400).send({error:"plz fill the data"})
    } else{

        req.user.password= undefined          // password ko show nhi krwane ke ley
        req.user.__v=undefined
        req.user._id=undefined
        

        const user = new Post({
            title,body,postedby:req.user         //req.user me user login ki details hai
        })
        user.save().then(()=>{
    
        res.status(201).send(user)
    
        }).catch((err)=>{
      
        res.status(400).send(err)
    
        }) 
    }
  })
//post method end......................................


//get method start ONLY JIS USER NE POST KARA USKA DATA SHOW......................................
router.get("/mypost",auth,async(req,res)=>{

    Post.find({postedby:req.user._id})
    .populate("postedby", "_id name").then(mypost=>{
      
        res.send({mypost})
    }).catch(err=>{
        console.log("err");
    })
})


//get method start ONLY JIS USER NE POST KARA USKA DATA SHOW......................................
// router.get("/get",auth,async(req,res)=>{

//     try{

//     const get= await  Post.find({postedby:req.user._id}) .populate("postedby", "_id name")

//     res.status(201).send(get)
//     }
//     catch(err)
//     {
//     res.status(400).send(err)
//     }
// })



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


router.delete("/delete/:id",auth,async(req,res)=>{

    Post.findOneAndDelete({postedby:req.user._id})
    .populate("postedby", "_id name").then(mypost=>{
      
        res.send("your data is delete")
    }).catch(err=>{
        console.log("err");
    })

})

router.put("/update/:id",auth,async(req,res)=>{

    Post.findOneAndUpdate({postedby:req.user._id})
    .populate("postedby", "_id name").then(mypost=>{
      
        res.send("your data is update")
    }).catch(err=>{
        console.log("err");
    })

})






//get method start......................................
router.get("/get",async(req,res)=>{

    Post.find().populate("postedby","_id name").then(posts=>{

        res.send({posts})
    }).catch(err=>{
        console.log("err");
    })
 
})
//get method end......................................


//put method start......................................
router.put("/update/:id",async(req,res)=>{


})
//put method end......................................

//delete method start......................................
router.delete("/delete/:id",async(req,res)=>{


})
//delete method end......................................
export default router

