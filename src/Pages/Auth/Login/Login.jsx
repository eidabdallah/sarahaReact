import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import styles from "./Login.module.css";
import logo from "../../../assets/logo/logo.png";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className={styles.logo} />
          <h3 className={styles.loginTitle}>تسجيل الدخول</h3>
        </div>
        <LoginForm />
        <div className="text-center mt-3">
          <p className={styles.textSmall}>
            ليس لديك حساب؟
            <Link to="/auth/register" className={styles.linkPrimary}>
              تسجيل حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
