const express=require("express")
const {PostModel}=require("../Models/Post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    try{
        const posts= await PostModel.find()
        res.send(posts)
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.post("/create",async(req,res)=>{

    const payload=req.body
    try{
        const newPost= new PostModel(payload)
        await newPost.save()
        res.send("Created A Post")
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.patch("/update/:id",async(req,res)=>{

    const ID=req.params.id
    const payload=req.body
    const post=await PostModel.findOne({"-id":ID})
    // const userId_in_post= post.userID
    // const userId_making_request=req.body.userID
    try{
    //    if(userId_making_request !== userId_in_post){
    //     res.send("Youd are not authorized")
    //    }else{
        await PostModel.findByIdAndUpdate({_id:ID},payload)
        res.send("Updated a Post")
    //    }
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{

    const ID=req.params.id
    const post=await PostModel.findOne({"-id":ID})
    // const userId_in_post= post.userID
    // const userId_making_request=req.body.userID
    try{
    //    if(userId_making_request !== userId_in_post){
    //     res.send("Youd are not authorized")
    //    }else{
        await PostModel.findByIdAndDelete({_id:ID})
        res.send("Deleted a Post")
    //    }
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

module.exports={
    postRouter
}
