import React, { useState } from "react";
import HeroData from "./HeroData";
import HeroImage from "./HeroImage";

import "./style.scss";

const HeroSection = ({ location, temp, weatherType, time }) => {
  return (
    <section className="hero">
      <HeroData
        location={location}
        temp={temp}
        weatherType={weatherType}
        time={time}
      />
      <HeroImage weatherType={weatherType} />
    </section>
  );
};

export default HeroSection;
