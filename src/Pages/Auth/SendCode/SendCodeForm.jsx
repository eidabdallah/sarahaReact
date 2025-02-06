import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";


export default function SendCodeForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const handleSendCodeSuccess = () => {
      toast.success("تم ارسال الرمز على الايميل ", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    };
    const sendCode = async (data) => {
      setIsLoading(true);
      try {
        const response = await axios.patch(`${import.meta.env.VITE_BURL}/auth/sendCode`, data);
        if (response.status === 200) {
            handleSendCodeSuccess();
            navigate('/auth/forgotPassword');
        }
      } catch (err) {
        setError(err.response?.data?.errors?.email || err.response?.data?.message || "حدث خطأ ما.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(sendCode)}>
        {error && <div className="text-danger mb-2">{error}</div>}
        <CustomInput label="البريد الإلكتروني" type="email" name="email" register={register} validation={{ required: "البريد الإلكتروني مطلوب", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "البريد الإلكتروني غير صالح" } }} errors={errors} />  
        <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold shadow-sm" disabled={isLoading}>
          {isLoading ? "جاري التحميل..." : "ارسال"}
        </Button>
      </form>
    );
}
