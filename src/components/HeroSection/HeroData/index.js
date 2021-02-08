import React from "react";
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
  const iconsDay = {
    clear: <WiDaySunny size={120} />,
    fewclouds: <WiDayCloudy size={120} />,
    clouds: <WiCloudy size={120} />,
    scatteredclouds: <WiDayCloudy size={120} />,
    brokenclouds: <WiDayCloudy size={120} />,
    showerrain: <WiShowers size={120} />,
    rain: <WiRain size={120} />,
    thunderstorm: <WiStormShowers size={120} />,
    snow: <WiSnow size={120} />,
    mist: <WiFog size={120} />,
    haze: <WiDayHaze size={120} />,
    loading: <WiDaySunny size={120} />,
  };
  const iconsNight = {
    clear: <WiNightClear size={120} />,
    fewclouds: <WiNightAltCloudy size={120} />,
    clouds: <WiNightAltCloudy size={120} />,
    scatteredclouds: <WiNightAltCloudy size={120} />,
    brokenclouds: <WiNightAltCloudy size={120} />,
    showerrain: <WiNightAltShowers size={120} />,
    rain: <WiNightAltShowers size={120} />,
    thunderstorm: <WiStormShowers size={120} />,
    snow: <WiNightAltSnow size={120} />,
    mist: <WiFog size={120} />,
    haze: <WiFog size={120} />,
    loading: <WiNightClear size={120} />,
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
            {
              ( weatherType && daytime === "day"
                ? iconsDay[weatherType.replace(/\s+/g, "").toLowerCase()]
                : iconsNight[weatherType.replace(/\s+/g, "").toLowerCase()])
            }
          </div>
          <div className="paragraph weather__text">{weatherType}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroData;
