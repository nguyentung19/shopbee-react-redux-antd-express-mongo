import { Button, Drawer, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actRegisterAsync } from "../../../store/admin/user/action.user";

export default function UserNewDrawer({ setAddNewUser, addNewUser }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {

    setLoading(true);
    dispatch(actRegisterAsync(values)).then((result) => {
      if (result.success) {
        messageApi.success("Đăng ký tài khoản thành công").then(() => {
          setAddNewUser(false);
          form.resetFields();
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
      <Drawer
        open={addNewUser}
        onClose={() => setAddNewUser(false)}
        title="Add new user"
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError={true}
          form={form}
        >
          <Form.Item label="Role" name="role" initialValue="user">
            <Select
              style={{
                width: 120,
              }}
              options={[
                {
                  label: "User",
                  value: "user",
                },
                {
                  label: "Admin",
                  value: "admin",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Username : "
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required",
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
                    new Error("The new password that you entered do not match!")
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
      </Drawer>
    </>
  );
}
