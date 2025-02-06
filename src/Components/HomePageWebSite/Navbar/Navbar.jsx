import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from './HomeNavbar.module.css';

export default function HomeNavbar() {

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white fs-4 fw-bold">
          صراحة
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 bg-white text-black" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/auth/login"} className={styles.navLink}>
              تسجيل دخول
            </Nav.Link>
            <Nav.Link as={Link} to={"/auth/register"} className={styles.navLink}>
              تسجيل حساب
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
