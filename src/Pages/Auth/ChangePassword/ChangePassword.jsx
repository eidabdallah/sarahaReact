import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const changepassword = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(`${import.meta.env.VITE_BURL}/auth/changePassword`, data, {
        headers: { Authorization: `Saraha__${token}` },
      });
      toast.success(response.data.message, {
        position: "top-right",
        theme: "dark",
      });
      reset(); 
    } catch (error) {
      const errorMessage = error.response?.data?.errors || "حدث خطأ أثناء التحديث";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 w-100 w-md-75 w-lg-50" style={{ maxWidth: "500px", minWidth: "280px" }}>
      <h2 className="text-center mb-4">تغير كلمة المرور</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit(changepassword)} className="shadow-lg p-4 rounded-3 bg-light">
       
        <CustomInput
          label="البريد الإلكتروني"type="email" name="email"
          register={register}
          validation={{
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "البريد الإلكتروني غير صالح",
            },
          }}
          errors={errors}
        />
         <CustomInput label="كلمة المرور القديمة" type="password" name="oldPassword" register={register} validation={{ required: "كلمة المرور مطلوبة", minLength: { value: 8, message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" } }} errors={errors} />
          <CustomInput label="كلمة المرور الجديدة" type="password" name="newPassword" register={register} validation={{ required: "كلمة المرور مطلوبة", minLength: { value: 8, message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" } }} errors={errors} />
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? "جارٍ التغيير..." : "تغيير كلمة المرور"}
        </Button>
      </Form>
    </div>
  );
}
