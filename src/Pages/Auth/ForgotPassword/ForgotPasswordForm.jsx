import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";


export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleForgotPasswordSuccess = () => {
        toast.success("تم تغيير كلمة المرور بنجاح ", {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
            transition: Bounce,
        });
    };
    const sendCode = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BURL}/auth/forgetPassword`, data);
            if (response.status === 200) {
                handleForgotPasswordSuccess();
                navigate('/auth/login');
            }
        } catch (err) {
            setError(error.response?.data?.errors?.email || error.response?.data?.errors?.password || error.response?.data?.errors?.code || error.response?.data?.message || error.response?.data?.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(sendCode)}>
            {error && <div className="text-danger mb-2">{error}</div>}
            <CustomInput label="البريد الإلكتروني" type="email" name="email" register={register} validation={{ required: "البريد الإلكتروني مطلوب", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "البريد الإلكتروني غير صالح" } }} errors={errors} />
            <CustomInput label="كلمة المرور الجديدة" type="password" name="password" register={register} validation={{ required: "كلمة المرور مطلوبة", minLength: { value: 8, message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" } }} errors={errors} />
            <CustomInput label="رمز التاكيد" type="text" name="code" register={register} validation={{ required: "الرمز مطلوب", minLength: { value: 6, message: "الرمز يجب أن يكون مكون من 6 خانات" }, maxLength: { value: 6, message: "الرمز يجب أن يكون مكون من 6 خانات" } }} errors={errors} />

            <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold shadow-sm" disabled={isLoading}>
                {isLoading ? "جاري التحميل..." : "تغيير كلمة المرور"}
            </Button>
        </form>
    );
}
