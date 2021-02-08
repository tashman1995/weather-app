import { useState, useEffect } from "react";

const useCurrentLocation = (options = {}) => {
  // store location in state
  const [locationDetails, setLocation] = useState();
  // store error message in state
  const [locationError, setError] = useState();

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { locationDetails, locationError };
};

export default useCurrentLocation;
