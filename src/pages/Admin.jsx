import { Link, Outlet } from "react-router-dom";
import styles from "./Admin.module.css";
import ecg from "../assets/ecg_logo.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useMap } from "../context/MapProvider";

function Admin() {
  const containerRef = useRef(null);
  const { adminPassword } = useMap();

  useEffect(() => {
    // Scroll the container into view on component mount
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <main className={styles.main} ref={containerRef}>
      <aside>
        <img src={ecg} alt="power grid" />
        <h3>
          Welcome{" "}
          {adminPassword ? adminPassword.toString().substring(2, 5) : 124}
        </h3>
        <p className={styles.exit}>
          <Link to="/">Log out</Link>
        </p>
      </aside>
      <div className={styles.dashWrapper}>
        <h1>Dashboard</h1>
        <div className={styles.dashboard}>
          <Link to={"metered"} className={styles.childWrapper}>
            <p>Metered</p>
          </Link>
          <Link to={"unmetered"} className={styles.childWrapper}>
            <p>Unmetered</p>
          </Link>
          <Link to={"non_access"} className={styles.childWrapper}>
            <p>Non Access</p>
          </Link>
          <Link to={"/map"} className={styles.childWrapper}>
            <p>Metered Geo Visualization</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </main>
  );
}

export default Admin;
