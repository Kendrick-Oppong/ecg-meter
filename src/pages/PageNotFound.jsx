import { Link, useLocation } from "react-router-dom";
import styles from './PageNotFound.module.css'
import PageNotFoundImage from "../assets/Oops! 404 Error with a broken robot-cuate.svg"

export const PageNotFound = () => {
  const { pathname } = useLocation();
 
  return (
    <main>
      <section className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <img
            className=""
            src={PageNotFoundImage}
            alt="page not found image"
          />
        </div>
        <div className={styles.msg}>
          <h1>
            Path name <span > {pathname} </span> could not be
            found
          </h1>
          <Link to="/">
            <button className={styles.cta}>
              Go back
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
