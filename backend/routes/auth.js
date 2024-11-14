const router=require("express").Router()

const bcrypt=require("bcryptjs")

const jwt=require("jsonwebtoken")
const multer=require("multer")
const User=require("../models/User")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})

router.post("/register",upload.single('profileImage'),async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body
        const profileImage=req.file
        if(!profileImage){
            return res.status(400).send("No File Uploaded")
        }
        const profileImagePath=profileImage.path
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User Already Exists"})
        }
        const salt=await bcrypt.genSalt()
        const hashedpassword=await bcrypt.hash(password,salt )
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashedpassword,
            profileImagePath,
        });
        await newUser.save()
        res.status(200).json({message:"User Registered success!"})


    }catch(err){
        res.json(500).json({message:"Registeration Failed!",error:err.message})
    }
})

router.post("/login",async(req,res)=>{
    try{
         const {email,password}=req.body;
         const user=await User.findOne({email})
         if(!user){
            return res.status(409).json({message:'User Does Not Exist!'});
         }
         const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
         }
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
         delete user.password
         res.status(200).json({token,user})

    }catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
})

module.exports=router