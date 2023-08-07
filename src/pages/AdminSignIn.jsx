/* eslint-disable react/no-unescaped-entities */
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import powergrid from "../assets/power_grid.avif";
import styles from "./AdminSignIn.module.css";
import { useMap } from "../context/MapProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import view from "../assets/view.png";
import hide from "../assets/hide.png";
import useTitle from "../hooks/useTitle";
import { validationSchema } from "./SignInPage";

// defining Yup validation schema

function AdminSignIn() {
  const { setAdminPassword, passwordMessage } = useMap();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useTitle("signin_admin");

  const initialValues = {
    password: "",
  };

  const handleSubmit = (values) => {
    const { password } = values;
    setAdminPassword(Number(password));
    navigate("/admin");
  };

  return (
    <div className={styles.outermostCont}>
      <div className={styles.aside}>
        <img src={powergrid} alt="power grid" />
      </div>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <h1>Enter Your ID To Continue</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, isValid }) => (
              <Form className={styles.form} autoComplete="off">
                {passwordMessage && (
                  <p className={`${styles.error} ${styles.passwordMessage} `}>
                    {passwordMessage}
                  </p>
                )}
                <div>
                  <div className={styles.password}>
                    <label htmlFor="password">ID</label>
                  </div>
                  <div style={{ position: "relative", marginBottom: "0" }}>
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      className={
                        touched.email && isValid ? styles.validInput : ""
                      }
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.togglePassword}
                    >
                      <img src={showPassword ? view : hide} alt="eye" />
                    </div>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div>
                  <button type="submit" className={styles.cta}>
                    Log In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
