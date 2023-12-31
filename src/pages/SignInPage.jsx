/* eslint-disable react/no-unescaped-entities */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import globeMap from "../assets/world_map.jpg";
import styles from "./SignInPage.module.css";
import { useMap } from "../context/MapProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import view from "../assets/view.png";
import hide from "../assets/hide.png";
import useTitle from "../hooks/useTitle";

// defining Yup validation schema

export const validationSchema = Yup.object().shape({
  password: Yup.number()
    .typeError("Password must be a number type")
    .required("Required")
    .test(
      "is-five-to-eight-digits",
      "Password must be 5 to 10 digits",
      (value) => /^\d{5,10}$/.test(value)
    ),
});

function SignInPage() {
  const { setMeterSerialNumber, passwordMessage } = useMap();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useTitle("signin_customer");

  const initialValues = {
    password: "",
  };

  const handleSubmit = (values) => {
    const { password } = values;
    setMeterSerialNumber(password);
    navigate("/customerInfo");
  };

  return (
    <div className={styles.outermostCont}>
      <div className={styles.aside}>
        <img src={globeMap} alt="world map" />
      </div>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <h1>Enter your meter serial number to continue</h1>
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
                    <label htmlFor="password">Customer ID</label>
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
                    Fetch Data
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

export default SignInPage;
