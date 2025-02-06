import React from "react";
import SharedNavbar from "../Components/shared/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/User/SideBar/SideBar.jsx";
import { Col, Container, Row } from "react-bootstrap";

export default function UserLayout() {
  return (
    <>
      <SharedNavbar />
      <Container fluid className="p-0">
        <Row>
          <Col md={2}>
            <SideBar />
          </Col>
          <Col md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
