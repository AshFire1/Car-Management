const router=require("express").Router()

const multer=require("multer")


const User=require("../models/User")
const Car = require("../models/Car")
const authenticateToken = require("./authenticatemiddleware")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage})
router.post("/create",upload.array("carPhotos"),async(req,res)=>{
   try{
    const {
        creator,
        title,
        description,
        tags
      } = req.body;
      const carPhotos=req.files
      if(!carPhotos){
        return res.status(400).send("No File Uploaded");
      }   
      const carPhotoPaths=carPhotos.map((file)=>file.path)
      const newCar = new Car({
        creator,
        title,
        description,
        tags,
        carPhotoPaths
      })
      await newCar.save()
      res.status(200).json(newCar)

   }catch(err){
    res.status(409).json({message:"Failed to create Car ",error:err.message})
    console.log(err)
   } 
})
router.get("/", authenticateToken, async (req, res) => {
    try {
        const cars = await Car.find({ creator: req.user.id }).populate("creator");

        if (!cars.length) {
            return res.status(404).json({ message: "No cars found for this user" });
        }

        res.status(200).json({ message: "Cars retrieved successfully", cars });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars", error: err.message });
        console.log(err);
    }
});

router.get("/search/:search", authenticateToken, async (req, res) => {
    const { search } = req.params;
    try {
        let cars = [];

        if (search === "all") {
            
            cars = await Car.find({ creator: req.user.id }).populate("creator");
        } else {
            cars = await Car.find({
                creator: req.user.id,
                $or: [
                    { description: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ]
            }).populate("creator");
        }

        res.status(200).json(cars);
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message });
        console.log(err);
    }
});
//car update
router.put("/:carId", authenticateToken, async (req, res) => {
    const { carId } = req.params;
    const {
        title,
        description,
        tags,
    } = req.body;

    try {
        const car = await Car.findById(carId).populate("creator");

        if (!car) {
            return res.status(404).send("Car not found!");
        }

        if (car.creator._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own cars" });
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;

        const updatedCar = await car.save();

        res.status(200).json({ message: "Car updated successfully", updatedCar });
    } catch (err) {
        res.status(500).json({ message: "Failed to update car", error: err.message });
        console.log(err);
    }
});
router.get("/:carId", authenticateToken, async (req, res) => {
    const { carId } = req.params;

    try {
        const car = await Car.findById(carId).populate("creator");

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Check if the car belongs to the authenticated user
        if (car.creator._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only view your own cars" });
        }

        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve car details", error: err.message });
        console.log(err);
    }
});

router.delete("/:carId", authenticateToken, async (req, res) => {
    const { carId } = req.params;

    try {
        const car = await Car.findById(carId).populate("creator");

        if (!car) {
            return res.status(404).json({ message: "Car not found!" });
        }

        if (car.creator._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own cars" });
        }

        await Car.findByIdAndDelete(carId);

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete car", error: err.message });
        console.log(err);
    }
});
module.exports=router