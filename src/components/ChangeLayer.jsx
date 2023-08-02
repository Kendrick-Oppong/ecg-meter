/* eslint-disable react/prop-types */
import { useState } from "react";
import terrain from "../assets/map.png";
function ChangeLayer({ selectedTileLayer, setSelectedTileLayer }) {
  const [hide, setHide] = useState(false);

  return (
    <div>
      <img
        src={terrain}
        alt="terrain"
        className="layer"
        onClick={() => setHide(!hide)}
        title="Change Map Layer"
      />
      {hide && (
        <div className={"layerContWrapper"}>
          <div className={"layerCont"}>
            <input
              type="radio"
              id="default"
              name="tileLayer"
              value="default"
              checked={selectedTileLayer === "default"}
              onChange={() => setSelectedTileLayer("default")}
            />
            <label htmlFor="default">OpenStreetMap.Mapnik</label>
          </div>

          <div className={"layerCont"}>
            <input
              type="radio"
              id="otherLayer1"
              name="tileLayer"
              value="otherLayer1"
              checked={selectedTileLayer === "otherLayer1"}
              onChange={() => setSelectedTileLayer("otherLayer1")}
            />
            <label htmlFor="otherLayer1">Stadia.OSMBright</label>
          </div>

          <div className={"layerCont"}>
            <input
              type="radio"
              id="otherLayer2"
              name="tileLayer"
              value="otherLayer2"
              checked={selectedTileLayer === "otherLayer2"}
              onChange={() => setSelectedTileLayer("otherLayer2")}
            />
            <label htmlFor="otherLayer2">OPNVKarte</label>
          </div>
          <div className={"layerCont"}>
            <input
              type="radio"
              id="otherLayer3"
              name="tileLayer"
              value="otherLayer3"
              checked={selectedTileLayer === "otherLayer3"}
              onChange={() => setSelectedTileLayer("otherLayer3")}
            />
            <label htmlFor="otherLayer3">OpenStreetMap.BZH</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeLayer;
