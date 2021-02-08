import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeroSection from "./components/HeroSection";
import SideBar from "./components/SideBar";
import axios from "axios";

import "./style/main.scss";

const api = {
  key: "6ae5f773da4211cd6fa8269fe8598983",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [location, setLocation] = useState("Loading...");
  const [longLat, setLongLat] = useState([0.121817, 52.205338]);

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  // Opening and closing Sidebar
  const [open, setOpen] = useState(false);

  // Media Query
  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  // Search Weather Function
  const search = (evt) => {
    if (evt) {
      if (evt.key === "Enter") {
        axios
          .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then((res) => {
            setError(false);
            updateResults(res);
            isMobile && setOpen(false);
          })
          .catch(() => setError(true));
      }
    }
  };

  // Handle updating state with search results
  const updateResults = (result) => {
    setWeather(result.data);
    setLocation(result.data.name);
    setQuery("");
  };

  // Initial Fetch
  useEffect(() => {
    axios
      .get(`${api.base}weather?q=london&units=metric&APPID=${api.key}`)
      .then((res) => {
        setError(false);
        updateResults(res);
        isMobile && setOpen(false);
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
