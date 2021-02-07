import React, { Fragment } from "react";
import "./style.scss";

const HeroImage = ({ weatherType }) => {
  const weatherImages = {
    clearsky: "cloudy-day.jpg",
    fewclouds: "cloudy-day.jpg",
    scatteredclouds: "cloudy-day.jpg",
    brokenclouds: "cloudy-day.jpg",
    showerrain: "cloudy-day.jpg",
    rain: "cloudy-day.jpg",
    thunderstorm: "cloudy-day.jpg",
    snow: "snow-day.jpg",
    mist: "cloudy-day.jpg",
  };
  
  return (
    <Fragment>
      <img
        className="image"
        src={
          process.env.PUBLIC_URL +
          `/img/${weatherImages[weatherType.replace(/\s+/g, "").toLowerCase()]}`
        }
        alt=""
      />
    </Fragment>
  );
};

export default HeroImage;
