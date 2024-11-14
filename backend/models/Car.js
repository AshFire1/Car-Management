const mongoose=require("mongoose")
const CarSchema=new mongoose.Schema(
    {
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        tags:{
            type:Array,
            default:[]
        },
        carPhotoPaths:[{type:String}]
    },
    {timestamps:true}
)

const Car=mongoose.model("Car",CarSchema)
module.exports=Car