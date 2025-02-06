import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";


export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const handleRegisterSuccess = () => {
      toast.success("تم إنشاء الحساب بنجاح ، الرجاء تاكيد حسابك عبر الايميل وتسجيل الدخول للتمتع بمزايا الموقع", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    };
    const LoginUser = async (data) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/register`, data);
        if (response.status === 201) {
            handleRegisterSuccess();
            navigate('/auth/login');
        }
      } catch (err) {
        setError(err.response?.data?.errors?.userName ||err.response?.data?.errors?.password || err.response?.data?.errors?.email || err.response?.data?.message || "حدث خطأ ما.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(LoginUser)}>
        {error && <div className="text-danger mb-2">{error}</div>}
        <CustomInput label="اسم المستخدم" type="text" name="userName" register={register} validation={{ required: "اسم المستخدم مطلوب", minLength: { value: 3, message: "يجب أن يتكون من 3 أحرف على الأقل" } }} errors={errors} />
        <CustomInput label="البريد الإلكتروني" type="email" name="email" register={register} validation={{ required: "البريد الإلكتروني مطلوب", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "البريد الإلكتروني غير صالح" } }} errors={errors} />
        <CustomInput label="كلمة المرور" type="password" name="password" register={register} validation={{ required: "كلمة المرور مطلوبة", minLength: { value: 8, message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" } }} errors={errors} />
  
        <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold shadow-sm" disabled={isLoading}>
          {isLoading ? "جاري التحميل..." : "تسجيل"}
        </Button>
      </form>
    );
}
