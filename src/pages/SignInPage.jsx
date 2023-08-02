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

// defining Yup validation schema
export const validationSchema = Yup.object().shape({
  password: Yup.number()
    .typeError("password must be a number type")
    .required("Required")
    .test("is-eight-digits", "Password must be exactly 8 digits", (value) =>
      /^\d{8}$/.test(value)
    ),
});

function SignInPage() {
  const { setMeterSerialNumber, passwordMessage } = useMap();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
  };

  const handleSubmit = async (values) => {
    const { password } = values;
    console.log(password);
    setMeterSerialNumber(password);
    navigate("/map");
  };

  return (
    <div className={styles.outermostCont}>
      <div className={styles.aside}>
        <img src={globeMap} alt="world map" />
      </div>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <h1>Enter meter serial number to view coordinates</h1>
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
                    Sign In
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
