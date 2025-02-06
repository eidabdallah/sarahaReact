import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Alert, Container, Row, Col } from "react-bootstrap";
import styles from "./MyMessages.module.css";
import LoadingPage from "../../Shared/Loading.jsx";

export default function MyMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMessages = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}/message`, {
        headers: { Authorization: `Saraha__${token}` },
      });
      setMessages(response.data.messages.messages || []);
    } catch (error) {
      setError(error.response?.data?.message || "حدث خطأ أثناء جلب الرسائل.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  if (loading) {
    return <LoadingPage />
  }
  return (
    <Container className={`py-4 ${styles.myMessages}`}>
      <h2 className="mb-4 text-center fw-bold">📩 رسائلك السرية</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && messages.length === 0 && !error && (
        <Alert variant="info" className="text-center">
          لا توجد رسائل بعد. ✨
        </Alert>
      )}

      <Row className="gy-3">
        {messages.map((message, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className={`${styles.messageCard} shadow-sm`}>
              <Card.Body>
                <Card.Text className="text-muted">{message.contant}</Card.Text>
                <hr />
                <div className="text-end text-secondary">
                  📅 {new Date(message.createdAt).toLocaleDateString("en-EG")}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {!loading && !error && messages.length > 0 && (
        <div className="text-center mt-4">
          <Alert variant="info">📬 لديك {messages.length} رسالة</Alert>
        </div>
      )}
    </Container>
  );
}
