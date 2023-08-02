/* eslint-disable react/prop-types */

import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markersData, setMarkersData] = useState([]);
  const [meterSerialNumber, setMeterSerialNumber] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://getpantry.cloud/apiv1/pantry/3b1cf39b-ed0e-4b07-94ce-8c14c403d365/basket/ne"
        );

        if (res.ok === false) setError(true);
        const data = await res.json();
        setMarkersData(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error.message + " data");
      }
    }
    fetchData();
  }, []);

  /* function logIn(email, password) {
    return "";
  } */

  return (
    <MapContext.Provider
      value={{
        loading,
        error,
        markersData,
        meterSerialNumber,
        setMeterSerialNumber,
        passwordMessage,
        setPasswordMessage,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  return useContext(MapContext);
}
