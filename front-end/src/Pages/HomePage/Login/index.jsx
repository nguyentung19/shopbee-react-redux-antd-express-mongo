import React, { useState } from "react";
import "../Register/Register.scss";
import { Form, ConfigProvider, Input, Button, message, Alert } from "antd";
import { useDispatch } from "react-redux";
import { actLoginAsync } from "../../../store/admin/auth/auth.action";
import { useNavigate } from "react-router-dom";
import { useNotLogin } from "../../../hook/useNotLogin";

export default function Login() {
  useNotLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const { email, password } = values;

    setLoading(true);
    dispatch(actLoginAsync({ email, password })).then((result) => {
      if (result.success) {
        setLoading(false);
        messageApi.success("Đăng nhập thành công").then(() => {
          navigate("/", { replace: true });
        });
      } else {
        setLoading(false);
        messageApi.error(result.error.response.data.error);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <div className="home-register">
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 0,
            },
          }}
        >
          <Form
            className="home-register-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Alert
              message="Tài khoản admin"
              description="Email : admin@gmail.com, Password : 123"
              type="info"
              showIcon
            />
            <h2 className="home-register-title">Login</h2>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            {/* Button */}
            <div
              style={{
                textAlign: "center",
                marginTop: 40,
              }}
            >
              <Button htmlType="submit" type="primary" loading={loading}>
                Login
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
}
