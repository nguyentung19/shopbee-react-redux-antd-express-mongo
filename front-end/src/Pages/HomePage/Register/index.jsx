import React from "react";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import "./Register.scss";
import { useDispatch } from "react-redux";
import { actRegisterAsync } from "../../../store/admin/user/action.user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotLogin } from "../../../hook/useNotLogin";

export default function Register() {
  // check login
  useNotLogin();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(actRegisterAsync(values)).then((result) => {
      if (result.success) {
        messageApi.success("Đăng ký tài khoản thành công").then(() => {
          navigate("/login", { replace: true });
        });
      } else {
        messageApi.error(result.error);
      }
      setLoading(false);
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
            scrollToFirstError={true}
          >
            <h2 className="home-register-title">Register Form</h2>

            <Form.Item
              label="Nickname : "
              name="username"
              rules={[
                {
                  required: true,
                  message: "Nickname is required",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email : "
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Please input your valid email",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              label="Password :"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  validator: (_, value) =>
                    !value.includes(" ")
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed")),
                },
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Phone is required",
                },
                {
                  validator: (_, value) =>
                    !value.includes(" ")
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed")),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Address is required",
                },
                {
                  validator: (_, value) =>
                    value.trim() !== ""
                      ? Promise.resolve()
                      : Promise.reject(new Error("No spaces allowed")),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div
              style={{
                textAlign: "center",
              }}
            >
              <Button htmlType="submit" type="primary" loading={loading}>
                Register
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
}
