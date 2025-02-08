import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./Home.module.css";
import logo from "../../../assets/logo/logo.png";
import { UserContext } from "../../../Context/UserContext.jsx";
import LoadingPage from "../Loading.jsx";
import axios from "axios";

export default function Home() {
  const { user, isLoading } = useContext(UserContext);
  const [messages, setMessages] = useState({ totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMessage = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}/message`, {
        headers: { Authorization: `Saraha__${token}` },
      });

      setMessages({
        totalCount: response.data?.messages?.totalCount || 0,
      });
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        setMessages({ totalCount: 0 });
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMessage();
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div className={`container py-4 ${styles.userHome}`}>
      <h2 className="mb-4 text-center fw-bold">👋 مرحبًا بك في صراحة!</h2>

      <div className="d-flex justify-content-center my-3">
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </div>

      <p className={`${styles.userUrl} mt-5 mb-5 text-center text-lg-end`}>
        رابط الشخصي للتواصل معك:
        <br className="d-lg-none" />
        <span className="fw-bold me-3 text-danger border border-2 border-danger p-1 mt-2 d-inline-block">
          {isLoading ? "جاري التحميل ..." : user?.urlUser || "غير متوفر"}
        </span>
      </p>


      {error && <div className="alert alert-danger">خطأ: {error}</div>}

      <div className="row g-3 d-flex justify-content-center">
        <div className="col-md-6">
          <Card className={styles.statCard}>
            <Card.Body>
              <h5>📥 الرسائل المستلمة</h5>
              <h2 className="fw-bold text-primary">{messages.totalCount}</h2>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className={styles.statCard}>
            <Card.Body>
              <h5>👀 عدد الزوار</h5>
              <h2 className="fw-bold text-success">{messages.totalCount}</h2>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
