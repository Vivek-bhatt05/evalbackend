const express=require("express")
const {UserModel}=require("../Models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err)
            }else{
                const user= new UserModel({name,email,gender,password:hash})
                await user.save()
                res.send("Registered User")
            }
        })
    }catch(err){
        res.send("error in registering")
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
       const user= await UserModel.find({email})

       if(user.length>0){
        const hashedPassword=user[0].password
        bcrypt.compare(password,hashedPassword,(err,result)=>{
            if(result){
                const token= jwt.sign({"userID":user[0]._id},"masai")
                res.send({"msg":"Login successfull","token":token})
            }else{
                res.send("wrong credentials")
            }
        })
       }else{
               res.send("wrong credentials")
       }
    }catch(err){
        res.send("error in login")
        console.log(err)
    }
})

module.exports={
    userRouter
}