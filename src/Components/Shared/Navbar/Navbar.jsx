import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function SharedNavbar() {
  const { user, isLoading , setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/auth/login");
  }
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand className="text-white fs-4 fw-bold">صراحة</Navbar.Brand>

        <span className="text-white ms-auto me-5 fs-5 border border-4 border-white p-2 rounded">
          {isLoading ? "جاري التحميل..." : user?.userName && `مرحبا ${user.userName}`}
        </span>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 bg-white text-black" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={Logout} className={styles.navLink}>
              تسجيل خروج
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
