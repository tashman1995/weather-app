import React, { Fragment } from "react";
import "./style.scss";

const HeroImage = ({ weatherType, daytime }) => {
  console.log(weatherType);
  const weatherImages = {
    clear: daytime ? "clear-day.jpg" : "clear-night.jpg",
    fewclouds: daytime ? "cloudy-day.jpg" : "cloudy-day.jpg",
    clouds: daytime ? "cloudy-day.jpg" : "cloudy-night.jpg",
    scatteredclouds: daytime ? "light-cloud-day.jpg" : "cloudy-day.jpg",
    brokenclouds: daytime ? "cloudy-day.jpg" : "cloudy-day.jpg",
    showerrain: daytime ? "rain-day.jpg" : "rain-night.jpg",
    rain: daytime ? "rain-day.jpg" : "rain-night.jpg",
    thunderstorm: daytime ? "storm-day.jpg" : "storm-night.jpg",
    snow: daytime ? "snow-day.jpg" : "snow-night.jpg",
    mist: daytime ? "cloudy-day.jpg" : "cloudy-day.jpg",
    haze: daytime ? "cloudy-day.jpg" : "cloudy-day.jpg",
    loading: daytime ? "cloudy-day.jpg" : "cloudy-day.jpg",
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
