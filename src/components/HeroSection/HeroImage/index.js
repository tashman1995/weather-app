import React, { Fragment, useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";

import "./style.scss";


// Image imports
import clearDay from "./img/clear-day.jpg";
import clearNight from "./img/clear-night.jpg";
import cloudyDay from "./img/cloudy-day.jpg";
import cloudyNight from "./img/cloudy-night.jpg";
import drizzleNight from "./img/drizzle-night.jpg";
import lightCloudDay from "./img/light-cloud-day.jpg";
import mistDay from "./img/mist-day.jpg";
import mistNight from "./img/mist-night.jpg";
import rainDay from "./img/rain-day.jpg";
import rainNight from "./img/rain-night.jpg";
import snowDay from "./img/snow-day.jpg";
import snowNight from "./img/snow-night.jpg";
import stormDay from "./img/storm-day.jpg";
import stormNight from "./img/storm-night.jpg";


const HeroImage = ({ weatherType, daytime }) => {
  const [index, setIndex] = useState(0);

  

  // Find Index of current weather
  useEffect(() => {
    const search = (nameKey, myArray) => {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].weather === nameKey) {
          return i;
        }
      }
    };

    console.log("weathertype", weatherType.replace(/\s+/g, "").toLowerCase());
    weatherType &&
      setIndex(
        search(
          weatherType.replace(/\s+/g, "").toLowerCase(),
          weatherImagesArray
        )
      );
  }, [weatherType]);

  const weatherImagesArray = [
    { weather: "clear", image: daytime ? clearDay : clearNight },
    {
      weather: "fewclouds",
      image: daytime ? lightCloudDay : cloudyNight,
    },
    {
      weather: "clouds",
      image: daytime ? cloudyDay : cloudyNight,
    },
    {
      weather: "scatteredclouds",
      image: daytime ? lightCloudDay : cloudyNight,
    },
    {
      weather: "brokenclouds",
      image: daytime ? lightCloudDay : cloudyNight,
    },
    {
      weather: "showerrain",
      image: daytime ? rainDay : drizzleNight,
    },
    {
      weather: "drizzle",
      image: daytime ? rainDay.jpg : drizzleNight,
    },
    { weather: "rain", image: daytime ? rainDay : rainNight },
    {
      weather: "thunderstorm",
      image: daytime ? stormDay : stormNight,
    },
    { weather: "snow", image: daytime ? snowDay : snowNight },
    { weather: "mist", image: daytime ? mistDay : mistNight },
    { weather: "haze", image: daytime ? mistDay : mistNight },
    {
      weather: "loading",
      image: daytime ? "clear-day.jpg" : "clear-night.jpg",
    },
  ];

  const transitions = useTransition(
    weatherImagesArray[index],
    (item) => item.weather,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
    }
  );

  return transitions.map(({ item, props, key }) => (
    <Fragment>
      {/* <img alt="" src={clearDay} /> */}
      <animated.div
        key={key}
        className="image"
        
        style={{
          ...props,
          backgroundImage: "url(" + item.image + ")",
        }}
      />
    </Fragment>
  ));


};

export default HeroImage;
