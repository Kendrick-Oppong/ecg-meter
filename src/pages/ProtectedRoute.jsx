/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useMap } from "../context/MapProvider";

const ProtectedRoute = ({ children }) => {
  const { markersData, meterSerialNumber, setPasswordMessage } = useMap();

  const serialNumberFound = markersData.some(
    (obj) => Number(obj.METER_SERIAL_NUMBER) === Number(meterSerialNumber)
  );

  if (!serialNumberFound) {
    // Navigate to the sign page
    setPasswordMessage("Incorrect Serial Number");
    return <Navigate to="/signin" />;
  }
  setPasswordMessage("");
  
  return children;
};

export default ProtectedRoute;
