import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../../Shared/Loading.jsx";
import { useForm } from "react-hook-form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SendMessage() {
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const Message = async (value) => {
    const token = localStorage.getItem('userToken');
    setServerError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/message`, value , {
        headers: {
          Authorization: `Saraha__${token}`,
        },
      });
      
      if (response.status === 201) {
        toast.success("تم ارسال الرسالة بنجاح ", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        reset();
      }
    } catch (error) {
      setServerError(error.response?.data?.errors?.contant || error.response?.data?.errors?.urlUrl || error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className={`p-4 shadow-lg rounded-4`} style={{ backgroundColor: "skyblue", maxWidth: "600px", width: "90%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold" style={{ fontSize: "1.5rem" }}> ارسال رسالة</h3>
        </div>
        <form onSubmit={handleSubmit(Message)}>
          {serverError && <div className='text-danger mb-2'>{serverError}</div>}

          <FloatingLabel controlId="floatingUrlUser" label="رابط المستلم" className="mb-3">
            <Form.Control type="text" placeholder="" {...register("urlUser", { required: "الرابط مطلوب" })} className="border-primary" />
            {errors.urlUser && <div className="text-danger mt-1 mb-2" style={{ fontSize: '0.875rem' }}>{errors.urlUser.message}</div>}
          </FloatingLabel>

          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>الرسالة</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="أدخل رسالتك هنا"
              {...register("contant", { required: "الرسالة مطلوبة" })}
              className="border-primary"
            />
            {errors.contant && <div className="text-danger text-end mt-1 mb-2" style={{ fontSize: '0.875rem' }}>{errors.contant.message}</div>}
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold shadow-sm" style={{ fontSize: '1rem' }} >
            ارسال
          </Button>
        </form>
      </div>
    </div>
  );
}
