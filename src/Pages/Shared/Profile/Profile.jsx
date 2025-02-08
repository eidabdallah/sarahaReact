import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../../Context/UserContext.jsx";
import CustomInput from "../../../Components/CustomComponent/CustomInput.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("userName", user.userName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const handleUpdate = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/user`,
        data,
        {
          headers: { Authorization: `Saraha__${token}` },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        ...data,
        urlUser: response.data.user.urlUser,
      }));
      if (user.email != data.email) {
        localStorage.removeItem("userToken");
        navigate("/");
        toast.info(
          "تم تغيير بريدك الالكتروني، يجب تاكيد حسابك و تسجيل الدخول مرة أخرى",
          {
            position: "top-right",
            theme: "dark",
          }
        );
      }
      toast.success(response.data.message, {
        position: "top-right",
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors?.userName ||
        error.response?.data?.errors?.email ||
        "حدث خطأ أثناء التحديث";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 w-100 w-md-75 w-lg-50" style={{ maxWidth: "500px", minWidth: "280px" }}>
      <h2 className="text-center mb-4">👤 الملف الشخصي</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit(handleUpdate)} className="shadow-lg p-4 rounded-3 bg-light" >
        <CustomInput
          label="اسم المستخدم"
          type="text"
          name="userName"
          register={register}
          validation={{
            required: "اسم المستخدم مطلوب",
            minLength: {
              value: 3,
              message: "يجب أن يتكون من 3 أحرف على الأقل",
            },
          }}
          errors={errors}
        />
        <CustomInput
          label="البريد الإلكتروني"
          type="email"
          name="email"
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
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? "جارٍ التحديث..." : "تحديث البيانات"}
        </Button>
      </Form>
    </div>
  );
}
