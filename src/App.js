import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeroSection from "./components/HeroSection";
import SideBar from "./components/SideBar";
import axios from "axios";

import "./style/main.scss";

const api = {
  key: "ae679129939d38219cf4d55a044415ba",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [location, setLocation] = useState("Loading...");
  const [longLat, setLongLat] = useState([0.121817, 52.205338]);

  const [query, setQuery] = useState("New York");
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
        // axios
        //   .get(api.base, {
        //     params: {
        //       q: query,
        //       units: "metric",
        //       APPID: api.key,
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((error) => console.log(`Error: ${error}`));
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            if (!result.message) {
              setError(false);
              updateResults(result);
              isMobile && setOpen(false);
            } else {
              setError(true);
            }
          });
      }
    }
  };

  // Handle updating state with search results
  const updateResults = (result) => {
    setWeather(result);
    setLocation(result.name);
    setQuery("");
  };

  // Initial Fetch using geolocation
  useEffect(() => {
    const getCurrentPosition = (options = {}) => {
      return new Promise((accept, reject) => {
        window.navigator.geolocation.getCurrentPosition(
          accept,
          reject,
          options
        );
      });
    };

    const loadPosition = async () => {
      try {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        const position = await getCurrentPosition(options);
        const { longitude, latitude } = position.coords;
        setLongLat([longitude, latitude]);

        const positionDetails = await axios.get(
          "https://www.mapquestapi.com/geocoding/v1/reverse",
          {
            params: {
              location: `${latitude}, ${longitude}`,
              key: "AmAsAiGQhuAM4MBV3mTj4HMYEWRXKym5",
            },
          }
        );

        setLocation(positionDetails.data.results[0].locations[0].adminArea5);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadPosition();

    fetch(
      `${api.base}weather?lat=${longLat[1]}&lon=${longLat[0]}&units=metric&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        updateResults(result);
      });
  }, []);

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
