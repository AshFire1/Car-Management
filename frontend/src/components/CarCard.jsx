import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CarCard = ({
  carId,
  title,
  description,
  tags,
  carPhotoPaths,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carPhotoPaths.length) % carPhotoPaths.length
    );
  };
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carPhotoPaths.length);
  };

  const navigate = useNavigate();

  return (
    <div className="listing-card">
      <div
        className="slider-container"
        onClick={() => {
          navigate(`/cars/${carId}`);
        }}
      >
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3030/${photo?.replace("public", "")}`}
                alt={`Car photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Tags: {tags.join(", ")}</p>
    </div>
  );
};

export default CarCard;
