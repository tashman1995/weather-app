import React, { useEffect, useState } from "react";
import { WiCloudy } from "react-icons/wi";
import moment from "moment";
import "./style.scss";

const HeroData = ({ location, temp, weatherType, sunText, date }) => {
  return (
    <div className="hero-data">
      <div className="hero-data__upper">
        <p className="paragraph ">
          {moment(date).format("HH:mm - dddd, D MMM 'YY")}
        </p>
      </div>
      <div className="hero-data__lower">
        <div className="hero-data__temp">
          <h2 className="heading-secondary">{temp.average}</h2>
          <div className="celcius"></div>
        </div>

        <div className="hero-data__detail">
          <div className="hero-data__location">
            <h3
              className={` heading-tertiary ${
                location && location.length > 9 && "heading-tertiary--small"
              }`}>
              {location}
            </h3>
            <p className="paragraph hero-data__date">{sunText}</p>
          </div>
        </div>
        <div className="weather">
          <div className="weather__icon">
            <WiCloudy size={120} />
          </div>
          <div className="paragraph weather__text">{weatherType}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroData;
