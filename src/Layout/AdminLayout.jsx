import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "../Components/Admin/SideBar/SideBar.jsx";
import SharedNavbar from "../Components/shared/Navbar/Navbar.jsx";

export default function AdminLayout() {
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
