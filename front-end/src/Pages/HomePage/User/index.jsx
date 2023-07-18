import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actEditUserAsync } from "../../../store/admin/user/action.user";
import { useNavigate } from "react-router-dom";

export default function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthAdmin.currentUser);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
      });
    } else {
      navigate("/login");
    }
  }, [user, form, navigate]);

  const onFinish = (values) => {
    setLoading(true);

    const updatedUser = {
      id: user._id,
      ...values,
    };

    dispatch(actEditUserAsync(updatedUser)).then((result) => {
      if (result.success) {
        setLoading(false);
        messageApi.success("Cập nhập thông tin thành công").then(() => {
          navigate("/", { replace: true });
        });
      }
    });
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="form-container">
          <Form
            className="form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <h2 className="form-title">Thông tin User</h2>

            {/* Email */}
            <Form.Item label="Email :" name="email">
              <Input disabled />
            </Form.Item>

            {/* Username */}
            <Form.Item label="Username :" name="username">
              <Input />
            </Form.Item>

            {/* Phone */}
            <Form.Item label="Phone :" name="phone">
              <Input type="text" />
            </Form.Item>

            {/* Address */}
            <Form.Item label="Address :" name="address">
              <Input />
            </Form.Item>

            <div
              style={{
                textAlign: "center",
              }}
            >
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
