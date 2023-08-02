import styles from "./FullPageLoader.module.css";
export const FullPageLoader = () => {
  return (
    <div className={styles.fullPageLoader}>
      <span className={styles.loader}></span>
      <p>Loading...</p>
    </div>
  );
};
