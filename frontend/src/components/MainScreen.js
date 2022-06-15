import React from "react";
import { Col, Container } from "react-bootstrap";
import "./Screen.css";

function MainScreen({ children, title }) {
  return (
    <div className="mainback">
      <Container>
        <Col>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                {/* <h3 className="subheading">{subtitle}</h3> */}
              
              </>
            )}
            {children}
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default MainScreen;
