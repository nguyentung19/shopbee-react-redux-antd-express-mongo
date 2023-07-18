import React from "react";
import "./HeaderTop.scss";
import { Col, Row } from "antd";
import HeaderTopLeft from "./HeaderTopLeft";
import HeaderTopRight from "./HeaderTopRight";

export default function HeaderTop() {
  return (
    <div className="header-top">
      <Row className="container" justify="space-between" align="middle">
        <Col>
          <HeaderTopLeft />
        </Col>
        <Col>
          <HeaderTopRight />
        </Col>
      </Row>
    </div>
  );
}
