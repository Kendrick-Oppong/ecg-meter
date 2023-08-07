import { useState } from "react";
import { useMap } from "../context/MapProvider";
import { useEffect } from "react";
import useTitle from "../hooks/useTitle";
import styles from "./CustomerDetail.module.css";
import ecg from "../assets/ecg_logo.png";
import { Link } from "react-router-dom";

function CustomerDetail() {
  const { markersData, meterSerialNumber } = useMap();
  const [customerInfo, setCustomerInfo] = useState({});
  useTitle("CustomerInfo");
  const [customerPrice, setCustomerPrice] = useState(null);

  const {
    ACTIVITY_CODE,
    METER_PHASE,
    METER_SERIAL_NUMBER,
    METER_TYPE,
    USAGE_CLASS,
  } = customerInfo;
  console.log(METER_SERIAL_NUMBER);
  useEffect(() => {
    const customerCredential = markersData.find(
      (customer) =>
        customer.METER_SERIAL_NUMBER === Number(meterSerialNumber.trim())
    );
    setCustomerInfo(customerCredential || {});
  }, [markersData, meterSerialNumber]);

  function getCustomerUnit(markerObj) {
    let price;
    switch (true) {
      case markerObj.USAGE_CLASS &&
        markerObj.USAGE_CLASS === "RESIDENTIAL" &&
        ["BUNGALOW", "BUNGALOW-KNUST", "CONTAINED", "SELF"].includes(
          markerObj.ACTIVITY_CODE
        ) &&
        markerObj.METER_SERIAL_NUMBER === METER_SERIAL_NUMBER:
        price = Math.round(326.46 + Math.random() * 100, 3);

        break;

      case markerObj.USAGE_CLASS &&
        markerObj.USAGE_CLASS === "RESIDENTIAL" &&
        ["STOREY", "KNUST"].includes(markerObj.ACTIVITY_CODE) &&
        markerObj.METER_SERIAL_NUMBER === METER_SERIAL_NUMBER:
        price = Math.round(616.84 + Math.random() * 100, 3);

        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        [
          "STATION",
          "HOSTEL",
          "HOSTEL-STOREY",
          "CANTEEN",
          "CAFETERIA",
          "SALOON",
          "PHARMACY",
        ].includes(markerObj.ACTIVITY_CODE) &&
        markerObj.METER_SERIAL_NUMBER === METER_SERIAL_NUMBER:
        price = Math.round(967.46 + Math.random() * 100, 3);

        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        [
          " CAMPUS",
          "ABBATOIR",
          " POWER",
          "ALUMINIM",
          "ALUMINUM",
          "FLOOR ",
          "QUARTERS",
          "WORKSHOP",
        ].includes(markerObj.ACTIVITY_CODE) &&
        markerObj.METER_SERIAL_NUMBER === METER_SERIAL_NUMBER:
        price = Math.round(1209.51 + Math.random() * 100, 3);

        break;

      case (markerObj.USAGE_CLASS === "COMMERCIAL" ||
        markerObj.USAGE_CLASS === "COMMENCIAL") &&
        ["BANK", "LIMITED", "RESTAURANT", "FACULTY", "STEEL"].includes(
          markerObj.ACTIVITY_CODE
        ) &&
        markerObj.METER_SERIAL_NUMBER === METER_SERIAL_NUMBER:
        price = Math.round(1624.28 + Math.random() * 100, 3);

        break;

      default:
        price = Math.round(1002.34 + Math.random() * 100, 3);
    }

    return price;
  }

  useEffect(() => {
    const price = getCustomerUnit(customerInfo);
    setCustomerPrice(price);
  }, [customerInfo]);

  const amountPaid = (45 / 100) * customerPrice;
  const arrears = Math.abs(customerPrice - amountPaid);

  return (
    <main className={styles.main}>
      <aside>
        <img src={ecg} alt="power grid" />
        <h3>
          Welcome B
          {METER_SERIAL_NUMBER
            ? METER_SERIAL_NUMBER.toString().substring(2, 5)
            : 1234}
        </h3>
        <p className={styles.exit}>
          <Link to="/">Log out</Link>
        </p>
      </aside>
      <div className={styles.dashboard}>
        <div className={styles.childWrapper}>
          <h2>Activity Code</h2>
          <p>{ACTIVITY_CODE}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Meter Phase</h2>
          <p>{METER_PHASE}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Meter Type</h2>
          <p>{METER_TYPE}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Usage Class</h2>
          <p>{USAGE_CLASS}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Total Amount</h2>
          <p>GH₵{customerPrice}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Amount Paid</h2>
          <p>GH₵{Math.round(amountPaid, 2)}</p>
        </div>
        <div className={styles.childWrapper}>
          <h2>Arrears</h2>
          <p className={styles.arrears}>GH₵{Math.round(arrears, 2)}</p>
        </div>
      </div>
    </main>
  );
}

export default CustomerDetail;
