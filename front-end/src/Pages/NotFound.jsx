import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
