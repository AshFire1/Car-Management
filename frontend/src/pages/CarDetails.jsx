import React, { useEffect, useState } from "react";
import "../styles/CarDetailsPage.scss"; 
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import CarCard from "../components/CarCard";

const CarDetails = () => {
  const { carId } = useParams();  
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);
  const token = useSelector((state) => state.token); // Get token for authentication

  const getCarDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/api/cars/${carId}`,  // Replace with your actual API endpoint
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      console.log("Fetched car details:", data); // Check the data structure
      setCar(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Car Details Failed", err.message);
    }
  };

  useEffect(() => {
    getCarDetails();  // Fetch car details when the page loads
  }, [carId]);

  return loading ? (
    <Loader />  // Show loader while data is loading
  ) : (
    <>
      <NavBar />
      <div className="car-details-page">
        <h1 className="car-title">{car.title}</h1>
        <div className="car-images">
          {car.carPhotoPaths?.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:3030/${photo.replace("public", "")}`} // Ensure proper URL path
              alt={`Car photo ${index + 1}`}
              className="car-image"
            />
          ))}
        </div>
        <div className="car-description">
          <h3>Description</h3>
          <p>{car.description}</p>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
