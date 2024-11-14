import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCars } from "../redux/state";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import CarCard from "../components/CarCard"; // Ensure this imports your CarCard component

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const token= useSelector((state)=>state.token)
  const getSearchCars = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/api/cars/search/${search}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Use the token for authorization
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      console.log("Fetched data:", data); // Log to check the structure of `data`
  
      dispatch(setCars({ cars: data.cars || data })); // Adjust based on data structure
  
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search Cars Failed", err.message);
    }
  };
  

  useEffect(() => {
    getSearchCars();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">{`Search results for: ${search}`}</h1>
      <div className="list">
        {cars.map(
          ({
            _id,
            carPhotoPaths,
            creator,
            title,
            description,
            tags,
          }) => (
            <CarCard
              carId={_id}
              carPhotoPaths={carPhotoPaths}
              creator={creator}
              title={title}
              description={description}
              tags={tags}
            />
          )
        )}
      </div>
    </>
  );
};

export default SearchPage;
