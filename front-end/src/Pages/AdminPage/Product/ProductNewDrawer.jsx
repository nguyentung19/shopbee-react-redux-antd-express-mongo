import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actAddNewProductAsync } from "../../../store/admin/product/action";

const normFile = (event) => {
  return event?.fileList;
};

export default function ProductNewDrawer({
  addNewProduct,
  setAddNewProduct,
  categoriesByName,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (newProduct) => {
    setLoading(true);
    dispatch(actAddNewProductAsync(newProduct)).then((result) => {
      if (result.success) {
        form.resetFields();
        setAddNewProduct(false);
        setLoading(false);
        setTimeout(() => {
          messageApi.success("Add new product successfully");
        }, 300);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Drawer
        open={addNewProduct}
        onClose={() => setAddNewProduct(false)}
        title="Add new product"
      >
        <Form onFinish={onFinish} form={form}>
          {/* name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <InputNumber
              prefix="đ"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* category */}
          <Form.Item
            label="Category"
            name="category"
            style={{ width: 230 }}
            rules={[
              {
                required: true,
                message: "Chọn 1 category",
              },
            ]}
          >
            <Select placeholder="Chọn category">
              {categoriesByName &&
                categoriesByName !== undefined &&
                categoriesByName.map((category, index) => {
                  return (
                    <Select.Option value={category} key={index}>
                      {category}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          {/* status */}
          <Form.Item label="Status" name="statusBoolean" initialValue={true}>
            <Select style={{ width: 120 }}>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* upload */}
          <Form.Item
            label="Upload"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Image is required",
              },
              {
                validator: (_, fileList) => {
                  return new Promise((resolve, reject) => {
                    switch (fileList ? fileList[0]?.type : null) {
                      case "image/jpg":
                      case "image/png":
                      case "image/jpeg": {
                        return resolve("success");
                      }
                      default:
                        return reject("jpg, png, jpeg is required");
                    }
                  });
                },
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              showUploadList={{
                showRemoveIcon: false,
              }}
              accept="image/jpg, image/jpeg, image/png"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          {/* submit */}
          <Button
            htmlType="submit"
            type="primary"
            style={{ float: "right" }}
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
}
