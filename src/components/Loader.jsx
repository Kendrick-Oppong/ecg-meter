import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.spinnerCont}>
      <div className={styles.customloader}></div>
      <p>Loading data...</p>
    </div>
  );
}

export default Loader;
