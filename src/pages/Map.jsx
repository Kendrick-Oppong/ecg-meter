import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Map.css";
import ChangeLayer from "../components/ChangeLayer";
import MarkersComponent from "../components/MarkersComponent";
import { useMap } from "../context/MapProvider";

function Map() {
  /* const { user } = useUserAuth(); */
  const { loading, error, markersData } = useMap();
  const [selectedTileLayer, setSelectedTileLayer] = useState("default");
   const memoizedTileLayers = useMemo(() => {
     return {
       default: {
         url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
         attribution:
           '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
       },
       otherLayer1: {
         url: `https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png`,
         attribution:
           '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
       },
       otherLayer2: {
         url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
         attribution:
           'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
       },
       otherLayer3: {
         url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
         attribution:
           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
       },
     };
   }, []);


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  // Defining the available tile slayers
 
  return (
    <div>
      <MapContainer
        style={{ height: "100vh" }}
        center={[6.671321824, -1.587319787]}
        zoom={6}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        {/* Using the selectedTileLayer state to switch between tile layers */}

        <TileLayer
          url={memoizedTileLayers[selectedTileLayer].url}
          attribution={memoizedTileLayers[selectedTileLayer].attribution}
        />

        <MarkerClusterGroup chunkedLoading>
          {markersData.map((marker) => (
            <MarkersComponent
              marker={marker}
              key={`${marker.METER_SERIAL_NUMBER}` + `  ${Math.random() * 3}`}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <ChangeLayer
        selectedTileLayer={selectedTileLayer}
        setSelectedTileLayer={setSelectedTileLayer}
      />
    </div>
  );
}

export default Map;
