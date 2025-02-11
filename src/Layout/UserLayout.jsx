import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row, Button, Offcanvas } from "react-bootstrap";
import SideBar from "../Components/User/SideBar/SideBar.jsx";
import SharedNavbar from './../Components/Shared/Navbar/Navbar';


export default function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <SharedNavbar />
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col xs={12} className="d-lg-none text-center my-2">
            <Button variant="primary" className="px-4 py-2 fw-bold" onClick={() => setShowSidebar(true)}>
              القائمة الجانبية
            </Button>
          </Col>

          <Col lg={2} className="d-none d-lg-block">
            <SideBar />
          </Col>

          <Col lg={10} sm={12} xs={12}>
            <Outlet />
          </Col>
        </Row>
      </Container>

      <Offcanvas 
  show={showSidebar} 
  onHide={() => setShowSidebar(false)} 
  placement="start"
  style={{ width: "270px", minWidth: "270px" }} 
>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>القائمة الجانبية</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <SideBar />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
