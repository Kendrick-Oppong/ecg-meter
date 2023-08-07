import styles from "./HomePage.module.css";
import lady from "../assets/lady.png";
import work from "../assets/confetti.png";
import star from "../assets/Stars.png";
import tickstar from "../assets/checkmark.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>
          <h1>
            Interactive <span>Insights</span>
          </h1>
          <p>
            Explore Energy Insights with Ease: <br /> Uncover your Consumption
            Patterns in a Click.
          </p>
        </div>
        <div className={styles.imgCont}>
          <img src={lady} alt="lady" className={styles.hero} />
          <img src={star} alt="" />
          <img src={tickstar} alt="" />
          <img src={work} alt="" />
        </div>
      </div>
      <div className={styles.cta}>
        <Link to="/signin_customer">
          <div>
            <h1>Continue as customer</h1>
          </div>
        </Link>
        <Link to={"/signin_admin"}>
          <div>
            <h1>Continue as admin/staff</h1>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
