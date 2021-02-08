import React from "react";
import { useMediaQuery } from "react-responsive";

import {
  WiCloudy,
  WiShowers,
  WiRain,
  WiSnow,
  WiNightAltCloudy,
  WiNightAltShowers,
  WiNightAltSnow,
  WiDayCloudy,
  WiDayHaze,
  WiStormShowers,
  WiNightClear,
  WiFog,
  WiDaySunny,
} from "react-icons/wi";
import moment from "moment";
import "./style.scss";

const HeroData = ({ location, temp, weatherType, sunText, date, daytime }) => {
const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  const iconsDay = {
    clear: <WiDaySunny size={isMobile ? 80 : 120} />,
    fewclouds: <WiDayCloudy size={isMobile ? 80 : 120} />,
    clouds: <WiCloudy size={isMobile ? 80 : 120} />,
    scatteredclouds: <WiDayCloudy size={isMobile ? 80 : 120} />,
    brokenclouds: <WiDayCloudy size={isMobile ? 80 : 120} />,
    showerrain: <WiShowers size={isMobile ? 80 : 120} />,
    rain: <WiRain size={isMobile ? 80 : 120} />,
    thunderstorm: <WiStormShowers size={isMobile ? 80 : 120} />,
    snow: <WiSnow size={isMobile ? 80 : 120} />,
    mist: <WiFog size={isMobile ? 80 : 120} />,
    haze: <WiDayHaze size={isMobile ? 80 : 120} />,
    loading: <WiDaySunny size={isMobile ? 80 : 120} />,
  };
  const iconsNight = {
    clear: <WiNightClear size={isMobile ? 80 : 120} />,
    fewclouds: <WiNightAltCloudy size={isMobile ? 80 : 120} />,
    clouds: <WiNightAltCloudy size={isMobile ? 80 : 120} />,
    scatteredclouds: <WiNightAltCloudy size={isMobile ? 80 : 120} />,
    brokenclouds: <WiNightAltCloudy size={isMobile ? 80 : 120} />,
    showerrain: <WiNightAltShowers size={isMobile ? 80 : 120} />,
    rain: <WiNightAltShowers size={isMobile ? 80 : 120} />,
    thunderstorm: <WiStormShowers size={isMobile ? 80 : 120} />,
    snow: <WiNightAltSnow size={isMobile ? 80 : 120} />,
    mist: <WiFog size={isMobile ? 80 : 120} />,
    haze: <WiFog size={isMobile ? 80 : 120} />,
    loading: <WiNightClear size={isMobile ? 80 : 120} />,
  };
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
        {/* Geographic Locationand sunset sunrise data */}
        <div className="hero-data__detail">
          <div className="hero-data__location">
            <h1
              className={` heading-primary ${
                location && location.length > 9 && "heading-primary--small"
              }`}>
              {location}
            </h1>
            <p className="paragraph hero-data__date">{sunText}</p>
          </div>
          <div className="weather weather--mobile">
            <div className="weather__icon">
              {weatherType && daytime === "day"
                ? iconsDay[weatherType.replace(/\s+/g, "").toLowerCase()]
                : iconsNight[weatherType.replace(/\s+/g, "").toLowerCase()]}
            </div>
            <div className="paragraph weather__text">{weatherType}</div>
          </div>
        </div>
        {/* Weather Icon and type windows */}
        <div className="weather ">
          <div className="weather__icon">
            {weatherType && daytime === "day"
              ? iconsDay[weatherType.replace(/\s+/g, "").toLowerCase()]
              : iconsNight[weatherType.replace(/\s+/g, "").toLowerCase()]}
          </div>
          <div className="paragraph weather__text">{weatherType}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroData;
