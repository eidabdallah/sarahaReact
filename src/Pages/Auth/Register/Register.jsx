import React from 'react'
import styles from "./Register.module.css";
import logo from "../../../assets/logo/logo.png";
import RegisterForm from './RegisterForm.jsx';
import { Link } from 'react-router-dom';
export default function Register() {
  return (
    <div className={styles.RegisterContainer}>
      <div className={styles.RegisterCard}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className={styles.logo} />
          <h3 className={styles.RegisterTitle}>إنشاء حساب</h3>
        </div>
        <RegisterForm />
        <div className="text-center mt-3">
          <p className={styles.textSmall}>
             لديك حساب؟
            <Link to="/auth/login" className={styles.linkPrimary}>
              تسجيل دخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
