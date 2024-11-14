import { useEffect, useState } from "react";
import "../styles/Listings.scss";
import CarCard from "./CarCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../redux/state"; 

const CarListings = () => {
    
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const cars = useSelector((state) => state.cars);
  const token=useSelector((state)=>state.token)
  const getCars = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/cars`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log("Fetched data:", data); // Log to check if `data` is an array or contains `cars` key
      
      // If `data` has `cars` as a key, use `data.cars`
      dispatch(setCars({ cars: data.cars || data })); // Adjust based on data structure
  
      setLoading(false);
    } catch (err) {
      console.log("Fetch Cars Failed", err.message);
    }
  };
  
  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <>
   
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {cars.map(
            ({
              _id,
              creator,
              title,
              description,
              tags,
              carPhotoPaths,
            }) => (
              <CarCard
                carId={_id}
                creator={creator}
                title={title}
                description={description}
                tags={tags}
                carPhotoPaths={carPhotoPaths}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default CarListings;
