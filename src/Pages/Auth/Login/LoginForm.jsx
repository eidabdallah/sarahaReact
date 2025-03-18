import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLoginSuccess = (token) => {
    localStorage.setItem("userToken", token);
    setTimeout(() => {
      localStorage.removeItem("userToken"); 
    }, 3600000);
    const userInfo = jwtDecode(token);
    toast.success("تم تسجيل الدخول بنجاح ، اهلا بك", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
    navigateToRole(userInfo.role);
  };

  const navigateToRole = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    }
  };

  const LoginUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/login`, data);
      if (response.status === 200) {
        handleLoginSuccess(response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.errors?.password || err.response?.data?.errors?.email || err.response?.data?.errors || "حدث خطأ ما.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(LoginUser)}>
      {error && <div className="text-danger mb-2">{error.errors}</div>}
      <CustomInput label="البريد الإلكتروني" type="email" name="email" register={register} validation={{ required: "البريد الإلكتروني مطلوب", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "البريد الإلكتروني غير صالح" } }} errors={errors} />
      <CustomInput label="كلمة المرور" type="password" name="password" register={register} validation={{ required: "كلمة المرور مطلوبة", minLength: { value: 8, message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" } }} errors={errors} />

      <div className="text-center mt-3">
        <p className={styles.textSmall}>
          <Link to="/auth/sendCode" className={styles.linkPrimary}>
            نسيت كلمة المرور؟
          </Link>
        </p>
      </div>
      <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold shadow-sm" disabled={isLoading}>
        {isLoading ? "جاري التحميل..." : "دخول"}
      </Button>
    </form>
  );
}
