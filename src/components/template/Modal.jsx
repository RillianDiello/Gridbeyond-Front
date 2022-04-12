import React from "react";

import { Modal, Button, Container, Row, Col } from "react-bootstrap";

const ModalInterno = ({ handleClose, show, title, value }) => {
  function renderBodyModal() {
    if (typeof value === "object") {
      return (
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                {value[0].id}                
              </Col>
              <Col xs={6} md={4}>
                {value[0].date}  
              </Col>
              <Col xs={6} md={4}>
                {value[0].value} 
              </Col>
            </Row>

            <Row>
            <Col xs={6} md={4}>
                {value[1].id}                
              </Col>
              <Col xs={6} md={4}>
                {value[1].date}  
              </Col>
              <Col xs={6} md={4}>
                {value[1].value} 
              </Col>
            </Row>
            <Row>
            <Col xs={12} md={8}>
                Total Range Value               
              </Col>
              
              <Col xs={6} md={4}>
                {value[1].value + value[0].value } 
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      );
    } else {
      return (
        <Modal.Body>
          <span>Value:{value}</span>
        </Modal.Body>
      );
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {renderBodyModal()}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInterno;
