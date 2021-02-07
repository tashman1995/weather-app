import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import SideBar from "./components/SideBar";
import axios from "axios";

import "./style/main.scss";

const api = {
  key: "cd0eab9c6099bca2b4ec4c682921bd2c",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [location, setLocation] = useState("Loading...");
  const [longLat, setLongLat] = useState([0.121817, 52.205338]);
  const [temp, setTemp] = useState({ min: 0, max: 0, average: 0 });
  const [weatherType, setWeatherType] = useState("loading");
  const [sunPosition, setSunPosition] = useState({
    sunrise: 0,
    sunset: 0,
  });
  const date = new Date();
  const timeSeconds = date.getTime();
  const [time, setTime] = useState(timeSeconds);

  const [query, setQuery] = useState("Cambridge");
  const [weather, setWeather] = useState({});

// Search Weather Function
   const search = (evt) => {
     if (evt) {
       if (evt.key === "Enter") {
         fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
           .then((res) => res.json())
           .then((result) => {
             setWeather(result);
             setQuery("");
             console.log(result);
           });
       }
     } 
   };

  // Calculate Users Current Position
  // useEffect(() => {
  //   const getCurrentPosition = (options = {}) => {
  //     return new Promise((accept, reject) => {
  //       window.navigator.geolocation.getCurrentPosition(
  //         accept,
  //         reject,
  //         options
  //       );
  //     });
  //   };

  //   const loadPosition = async () => {
  //     try {
  //       const options = {
  //         enableHighAccuracy: true,
  //         timeout: 5000,
  //         maximumAge: 0,
  //       };
  //       const position = await getCurrentPosition(options);
  //       const { longitude, latitude } = position.coords;

  //       const positionDetails = await axios.get(
  //         "http://www.mapquestapi.com/geocoding/v1/reverse",
  //         {
  //           params: {
  //             location: `${latitude}, ${longitude}`,
  //             key: "AmAsAiGQhuAM4MBV3mTj4HMYEWRXKym5",
  //           },
  //         }
  //       );
  //       const location =
  //         positionDetails.data.results[0].locations[0].adminArea5;
  //       setLocation(location);
  //       search()
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   loadPosition();
  //   search(null);
  // }, []);

 

  // // GET weather from geolocation
  // useEffect(() => {
  //   console.log('get weather')
  //   const getWeather = async () => {
  //     const currentWeather = await axios.get(
  //       "http://api.openweathermap.org/data/2.5/weather",
  //       {
  //         params: {
  //           lat: longLat[1],
  //           lon: longLat[0],
  //           appid: "cd0eab9c6099bca2b4ec4c682921bd2c",
  //           units: "metric",
  //         },
  //       }
  //     );

  //     const weatherData = currentWeather.data;

  //     const { main, weather } = weatherData;
  //     const { temp, temp_min, temp_max } = main;

  //     setWeatherType(weather[0].main);
  //     setTemp({
  //       min: Math.round(temp_min),
  //       max: Math.round(temp_max),
  //       average: Math.round(temp),
  //     });
  //     setSunPosition({
  //       sunrise: weatherData.sys.sunrise,
  //       sunset: weatherData.sys.sunset,
  //     });
  //   };

  //   getWeather();
  // }, [longLat]);

  return (
    <div className="App">
      <HeroSection
        location={location}
        temp={temp}
        weatherType={weatherType}
        time={time}
      />
      <SideBar setQuery={setQuery} search={search} />
    </div>
  );
}

export default App;
