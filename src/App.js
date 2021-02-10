import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeroSection from "./components/HeroSection";
import SideBar from "./components/SideBar";
import useCurrentLocation from "./components/useCurrentLocation";
import axios from "axios";

import "./style/main.scss";

const api = {
  key: "ae679129939d38219cf4d55a044415ba",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [location, setLocation] = useState("Loading...");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  // For using geodata initially
  const [useGeoData, setUseGeoData] = useState(true);

  // Opening and closing Sidebar
  const [open, setOpen] = useState(false);

  // Media Query
  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  // Search Weather Function
  const search = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          setUseGeoData(false);
          setError(false);
          updateResults(res);
          setQuery("");
          isMobile && setOpen(false);
        })
        .catch(() => setError(true));
    }
  };

  // Handle updating state with search results
  const updateResults = (result) => {
    setWeather(result.data);
    setLocation(result.data.name);
  };

  // Handle geolocation on intial load
  const geolocationOptions = {
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  };

  const { locationDetails } = useCurrentLocation(geolocationOptions);

  useEffect(() => {
    if (useGeoData && locationDetails) {
      axios
        .get(
          `${api.base}weather?lat=${locationDetails.latitude}&lon=${locationDetails.longitude}&units=metric&APPID=${api.key}`
        )
        .then((res) => {
          setError(false);
          updateResults(res);
        })
        .catch(() => setError(true));
    }
  }, [locationDetails, useGeoData]);

  // Initial Load
  useEffect(() => {
    axios
      .get(`${api.base}weather?q=london&units=metric&APPID=${api.key}`)
      .then((res) => {
        setError(false);
        updateResults(res);
      })
      .catch(() => setError(true));
  }, [isMobile]);

  return (
    <div className="App">
      <HeroSection weatherData={weather} location={location} />
      <SideBar
        weatherData={weather}
        setQuery={setQuery}
        search={search}
        query={query}
        error={error}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default App;
