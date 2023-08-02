/* eslint-disable react/prop-types */
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import location from "../assets/location.svg";
import { useEffect, useState } from "react";

const customIcon = new L.Icon({
  iconUrl: location,
  iconSize: new L.Point(35, 35),
});

const MarkersComponent = ({ marker }) => {
  const [totalPrice, setTotalPrice] = useState(null);

  function getMeterUnit(markerObj) {
    let price;
    switch (true) {
      case markerObj.USAGE_CLASS &&
        markerObj.USAGE_CLASS === "RESIDENTIAL" &&
        ["BUNGALOW", "BUNGALOW-KNUST", "CONTAINED", "SELF"].includes(
          markerObj.ACTIVITY_CODE
        ):
        price = Math.round(326.46 + Math.random() * 100, 3);
     
        break;

      case markerObj.USAGE_CLASS &&
        markerObj.USAGE_CLASS === "RESIDENTIAL" &&
        ["STOREY", "KNUST"].includes(markerObj.ACTIVITY_CODE):
        price = Math.round(616.84 + Math.random() * 100, 3);
      
        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        [
          "STATION",
          "HOSTEL",
          "HOSTEL-STOREY",
          "CANTEEN",
          "CAFETERIA",
          "SALOON",
          "PHARMACY",
        ].includes(markerObj.ACTIVITY_CODE):
        price = Math.round(967.46 + Math.random() * 100, 3);
       
        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        [
          " CAMPUS",
          "ABBATOIR",
          " POWER",
          "ALUMINIM",
          "ALUMINUM",
          "FLOOR ",
          "QUARTERS",
          "WORKSHOP",
        ].includes(markerObj.ACTIVITY_CODE):
        price = Math.round(1209.51 + Math.random() * 100, 3);
       
        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        ["BANK", "LIMITED", "RESTAURANT", "FACULTY", "STEEL"].includes(
          markerObj.ACTIVITY_CODE
        ):
        price = Math.round(1624.28 + Math.random() * 100, 3);
      
        break;

      default:
        price = Math.round(1002.34 + Math.random() * 100, 3);
    }
    
    return price;
  }

  useEffect(() => {
    const price = getMeterUnit(marker);
    setTotalPrice(price);
  }, [marker]);

  return (
    <Marker
      position={[marker.LAT, marker.LNG]}
      icon={customIcon}
      title={marker.METER_SERIAL_NUMBER}
    >
      <Popup
        className={
          marker.USAGE_CLASS === "RESIDENTIAL" ? "residential" : "commercial"
        }
      >
        <div>
          <p>Meter Serial Number: {marker.METER_SERIAL_NUMBER}</p>
          <p>Meter Type: {marker.METER_TYPE}</p>
          <p>Meter Phase: {marker.METER_PHASE}</p>
          <p>Usage Class: {marker.USAGE_CLASS}</p>
          <p>Activity Code: {marker.ACTIVITY_CODE}</p>
          <p>Remarks: {marker.REMARKS}</p>
          <div>
            {totalPrice !== null ? (
              <p style={{ fontWeight: "bold" }}>
                Total Net Price: GH₵{totalPrice}
              </p>
            ) : (
              <p style={{ fontStyle: "italic" }}>Calculating price...</p>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkersComponent;
