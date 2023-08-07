/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useMap } from "../context/MapProvider";

const ProtectedAdmin = ({ children }) => {
  const { adminPassword, setPasswordMessage } = useMap();

  if (adminPassword !== 85974652) {
    // Navigate to the sign page
    console.log("failed authentication");
    setPasswordMessage("Incorrect ID");
    return <Navigate to="/signin_admin" />;
  }

  setPasswordMessage("");

  return children;
};

export default ProtectedAdmin;
