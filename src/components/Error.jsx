import styles from "./Error.module.css";
function Error() {
  return (
    <div className={styles.errorCont}>
      <p>Failed to fetch data</p>
    </div>
  );
}

export default Error;
