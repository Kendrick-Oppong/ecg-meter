/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TableContainer,
  TextField,
} from "@mui/material";
import styles from "./Meter.module.css";
import useFetch from "./hooks/useFetch";
import Loader from "./components/Loader";
import Error from "./components/Error";
import location from "./assets/location.svg";


const default_Coord = {
  lat: 6.672189776, 
  lng: -1.58643428,
};

const Meter = ({ keep, url }) => {
  const { meter, loading, error } = useFetch(url);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(default_Coord);
  const rowsPerPage = 100;

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const handleCellClick = (lat, lng) => {
    setSelectedCoordinates({ lat, lng });
  };

  useEffect(() => {
    if (selectedCoordinates) {
      const { lat, lng } = selectedCoordinates;

      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView([lat, lng], 18);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

    const customIcon = L.icon({
      iconUrl: location,
      iconSize: new L.Point(35, 35), 
      iconAnchor: [16, 32], 
    });

    // Use the custom icon for the marker
    L.marker([lat, lng], { icon: customIcon }).addTo(map);
      mapRef.current = map;
    }
    // Automatic scrolling to the map element
    mapContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedCoordinates]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const searchableFields = [
    "LAT",
    "LNG",
    ...(keep
      ? ["STRUCTURE_ID", "METER_SERIAL_NUMBER", "METER_TYPE", "METER_PHASE"]
      : []),
    "USAGE_CLASS",
    "ACTIVITY_CODE",
    "REMARKS",
  ];

  const lowerCaseSearchQuery = searchQuery.toLowerCase();

  const filteredData = meter.filter((marker) =>
    searchableFields.some((field) => {
      const fieldValue = marker[field];
      return (
        fieldValue &&
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(lowerCaseSearchQuery)
      );
    })
  );

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) <Loader />;

  if (error) <Error />;

  return (
    <main className={styles.main}>
      <Paper>
        <TableContainer component={Paper} style={{ maxHeight: 440 }}>
          <TableCell colSpan={4}>
            <form>
              <TextField
                label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Enter serial number"
              />
            </form>
          </TableCell>
          <TableCell colSpan={keep ? 2 : 1} />
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                {keep && <TableCell>Structure ID</TableCell>}
                {keep && <TableCell>Meter Serial Number</TableCell>}
                {keep && <TableCell>Meter Type</TableCell>}
                {keep && <TableCell>Meter Phase</TableCell>}
                <TableCell>Usage Class</TableCell>
                <TableCell>Activity Code</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slicedData.map((marker, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleCellClick(marker.LAT, marker.LNG)}
                >
                  <TableCell>{marker.LAT}</TableCell>
                  <TableCell>{marker.LNG}</TableCell>
                  {keep && <TableCell>{marker.STRUCTURE_ID}</TableCell>}
                  {keep && <TableCell>{marker.METER_SERIAL_NUMBER}</TableCell>}
                  {keep && <TableCell>{marker.METER_TYPE}</TableCell>}
                  {keep && <TableCell>{marker.METER_PHASE}</TableCell>}
                  <TableCell>{marker.USAGE_CLASS}</TableCell>
                  <TableCell>{marker.ACTIVITY_CODE}</TableCell>
                  <TableCell>{marker.REMARKS}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100]}
          component="div"
          count={meter.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
      <div
        ref={mapContainerRef}
        style={{ height: "500px", marginTop: "20px" }}
      />
    </main>
  );
};

export default Meter;
