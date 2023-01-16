const express=require("express")
const cors =require("cors")
const app=express();
const {connection}=require("./config/db");
const { userRouter } = require("./Routes/User.route");
const { postRouter } = require("./Routes/Post.route");
const { authenticate } = require("./Middlewares/auth");
require("dotenv").config()

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/users",userRouter)
// app.use(authenticate)
app.use("/posts",postRouter)


app.listen(process.env.Port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err);
        res.send("Something wrong in database")
    }
    console.log("Port Running")
})