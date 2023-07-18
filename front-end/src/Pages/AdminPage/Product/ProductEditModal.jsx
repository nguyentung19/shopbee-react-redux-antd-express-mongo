import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  Image,
  message,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actEditProductAsync } from "../../../store/admin/product/action";

export default function ProductEditModal({
  openEditModal,
  setOpenEditModal,
  editProduct,
  categoriesByName,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [defaultImage, setDefaultImage] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (editProduct) {
      form.setFieldsValue({
        name: editProduct.name,
        price: toGetPrice(editProduct.price),
        category: editProduct.category,
        statusBoolean: editProduct.statusBoolean,
        image: [],
      });

      setDefaultImage(editProduct.image);
    }
  }, [editProduct, form]);

  const onFinish = (newData) => {
    setConfirmLoading(true);
    let updatedData = editProduct;

    Object.keys(newData).forEach((key) => {
      updatedData[key] = newData[key];
    });

    updatedData = {
      ...updatedData,
      image: defaultImage ?? newData.image[0].originFileObj,
    };


    dispatch(actEditProductAsync(updatedData))
      .then((result) => {
        if (result.success) {
          messageApi.success("Edit Successfully");
          setConfirmLoading(false);
          setOpenEditModal(false);
        }
      })
      .catch((error) => {
        messageApi.error(error);
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        title="Edit Product"
        okText="Save"
        onOk={form.submit}
        confirmLoading={confirmLoading}
      >
        <Form form={form} onFinish={onFinish}>
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
            <Select
              options={
                categoriesByName &&
                categoriesByName.map((category) => ({
                  label: category,
                  value: category,
                }))
              }
            />
          </Form.Item>

          {/* status */}
          <Form.Item
            label="Status"
            name="statusBoolean"
            rules={[
              {
                required: true,
                message: "Status is required",
              },
            ]}
          >
            <Select style={{ width: "120px" }}>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* upload image */}
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(event) => event?.fileList}
            rules={[
              {
                validator: (_, fileList) => {
                  return new Promise((resolve, reject) => {
                    if (defaultImage) return resolve("success");

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
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
              showUploadList={{ showRemoveIcon: false }}
              onChange={() => setDefaultImage()}
            >
              <Space direction="vertical">
                <Button icon={<UploadOutlined />}>Upload</Button>
                {defaultImage ? (
                  <Image
                    src={defaultImage.path}
                    width={100}
                    height={100}
                    style={{ objectFit: "contain" }}
                    preview={false}
                  />
                ) : null}
              </Space>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const toGetPrice = (price) => {
  return price.replace(/[^\d]/g, "");
};
