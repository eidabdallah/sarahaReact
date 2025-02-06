import React from 'react'
import styles from "./ForgotPassword.module.css";
import logo from "../../../assets/logo/logo.png";
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
export default function ForgotPassword() {
  return (
    <div className={styles.ForgetPasswordContainer}>
          <div className={styles.ForgetPasswordCard}>
            <div className="text-center mb-4">
              <img src={logo} alt="Logo" className={styles.logo} />
              <h3 className={styles.ForgetPasswordTitle}>كلمة سر الجديدة</h3>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
  )
}
