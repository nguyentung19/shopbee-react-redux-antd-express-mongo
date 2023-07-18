import React from "react";
import { Card, Col, Row } from "antd";

export default function HomeCategory({ categories }) {
  return (
    <>
      {/* title */}
      <h2 className="home-title">Danh mục</h2>
      {/* Category list */}
      <div>
        <Row gutter={10}>
          {categories.map((category, index) => {
            return (
              <Col key={index}>
                <Card
                  cover={
                    <img
                      src={category.thumbUrl}
                      alt={category.name}
                      className="home-category-img"
                    />
                  }
                  hoverable
                  style={{
                    width: 200,
                  }}
              
                >
                  <Card.Meta
                    title={category.name}
                    className="home-category-meta"
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
