import React, { useState, useEffect } from "react";
import HeroData from "./HeroData";
import HeroImage from "./HeroImage";

import "./style.scss";

const HeroSection = ({ weatherData, location }) => {
  const [temp, setTemp] = useState({ min: 0, max: 0, average: 0 });
  const [weatherType, setWeatherType] = useState("clear");
  const [timeZoneDiff, setTimeZoneDiff] = useState(0);
  const [sunPosition, setSunPosition] = useState([0, 0]);
  const [date, setDate] = useState(new Date());
  const [sunText, setSunText] = useState("Sunset in N/A hours");
  const [daytime, setDaytime] = useState("day");

  // Handling weather Data
  useEffect(() => {
    const { main, weather, timezone, sys } = weatherData;

    setTimeZoneDiff(timezone);
    main &&
      setTemp({
        average: Math.round(main.temp),
        max: Math.round(main.temp_max),
        min: Math.round(main.temp_min),
      });

    weather && setWeatherType(weather[0].main);

    sys && setSunPosition([sys.sunrise, sys.sunset]);

    // Calculate time to sunrise or sunset

    const time = date.getTime() / 1000;
    const sunrise = sunPosition[0] + timeZoneDiff;
    const sunset = sunPosition[1] + timeZoneDiff;

    if (time > sunrise && time < sunset) {
      // Daytime
      const diff = Math.round((sunset - time) / 60 / 60);
      setSunText(`Sunset is ${diff} hours away`);
      setDaytime("day");
    } else if (time > sunset) {
      // After Sunset
      const diff = Math.round((time - sunset) / 60 / 60);
      setSunText(`Sunset was ${diff} hours ago`);
      setDaytime("night");
    } else {
      // Before Sunrise
      const diff = Math.round((sunrise - time) / 60 / 60);
      setSunText(`Sunrise is ${diff} hours away`);
      setDaytime("night");
    }
  }, [weatherData, timeZoneDiff]);

  // Calculate time zone difference

  useEffect(() => {
    const targetTime = new Date();
    const shiftedDate = new Date(targetTime.getTime() + timeZoneDiff * 1000);
    const timer = setInterval(() => setDate(shiftedDate), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // Calculate time to sunrise or sunset
  useEffect(() => {}, [weatherData, sunPosition, date, timeZoneDiff]);

  return (
    <section className="hero">
      <HeroData
        location={location}
        temp={temp}
        weatherType={weatherType}
        timeZoneDiff={timeZoneDiff}
        sunText={sunText}
        date={date}
        daytime={daytime}
      />
      <HeroImage weatherType={weatherType} daytime={daytime} />
    </section>
  );
};

export default HeroSection;
