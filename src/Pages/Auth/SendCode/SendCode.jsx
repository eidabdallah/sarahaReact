import React from "react";
import styles from "./sendCode.module.css";
import logo from "../../../assets/logo/logo.png";
import SendCodeForm from './SendCodeForm';

export default function SendCode() {
  return (
    <div className={styles.sendCodeContainer}>
      <div className={styles.sendCodeCard}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className={styles.logo} />
          <h3 className={styles.sendCodeTitle}>ارسال رمز التاكيد</h3>
        </div>
        <SendCodeForm />
      </div>
    </div>
  )
}
