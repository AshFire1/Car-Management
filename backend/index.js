const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const authRoutes=require("./routes/auth")
const carRoutes=require("./routes/car")
const cors=require("cors")
app.use(cors(
    {
        origin:["https://deploy-mern-1whq.vercel.app"],
        methods:["POST","GET","DELETE","PUT"],
        credentials:true
    }
));
app.use(express.json())
app.use(express.static("public"))
app.use("/api/auth",authRoutes)
app.use("/api/cars",carRoutes)

const PORT=process.env.PORT

mongoose.connect(process.env.MONGO_URL,{
    dbName:"Car_Management",
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port ${PORT}`))
}).catch((err)=>console.log(`${err} did not connect`))
