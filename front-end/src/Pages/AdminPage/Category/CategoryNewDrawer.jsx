import { UploadOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select, Upload, message } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actAddNewCategoryAsync } from "../../../store/admin/category/action";

const normFile = (event) => {
  return event.fileList.slice(-1);
};

export default function CategoryNewDrawer({
  addNewCategory,
  setAddNewCategory,
}) {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // ACTION ADD NEW CATEGORY
  const handleOnSubmit = (values) => {
    setSubmitLoading(true);
    dispatch(actAddNewCategoryAsync(values))
      .then(() => {
        setSubmitLoading(false);
        setAddNewCategory(false);
        form.resetFields();
        setTimeout(() => {
          messageApi.success("Add new Successfully!!!");
        }, 300);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {contextHolder}
      <Drawer
        open={addNewCategory}
        onClose={() => setAddNewCategory(false)}
        title="Add new category"
      >
        {/* FORM */}
        <Form form={form} onFinish={handleOnSubmit}>
          {/* name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* status */}
          <Form.Item label="Status" name="statusBoolean" initialValue={true}>
            <Select style={{ width: "120px" }}>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* upload */}
          <Form.Item
            label="Upload"
            name="thumbUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Image is required",
              },
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          {/*  submit  */}
          <Button type="primary" htmlType="submit" loading={submitLoading}>
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
}
