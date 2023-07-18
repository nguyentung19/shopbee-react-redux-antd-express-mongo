import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Modal,
  Input,
  Select,
  Upload,
  Space,
  Button,
  Image,
  message,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actEditCategoryAsync } from "../../../store/admin/category/action";

const normFile = (event) => {
  if (Array.isArray(event)) {
    return event;
  }

  return event && event.fileList;
};

export default function CategoryEditModal({
  editModal,
  setEditModal,
  editRecord,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [defaultImage, setDefaultImage] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue({
        name: editRecord.name,
        statusBoolean: editRecord.statusBoolean,
        thumbUrl: [],
      });

      setDefaultImage(editRecord.thumbUrl);
    }
  }, [editRecord, form]);

  const handleEditCategory = async (values) => {
    setConfirmLoading(true);
    let newRecord = {
      ...editRecord,
      name: values.name,
      statusBoolean: values.statusBoolean,
      thumbUrl: defaultImage ?? values.image[0].originFileObj,
    };

    await dispatch(actEditCategoryAsync(newRecord))
      .then((result) => {
        if (result.success) {
          setConfirmLoading(false);
          setEditModal(false);
          message.success("Edit Successfully");
        }
      })
      .catch((error) => message.error(error));
  };
  return (
    <Modal
      open={editModal}
      onCancel={() => {
        setEditModal(false);
      }}
      title="Edit Category"
      onOk={form.submit}
      confirmLoading={confirmLoading}
      okText="Save"
    >
      <Form form={form} style={{ marginTop: 30 }} onFinish={handleEditCategory}>
        {/* name */}
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        {/* status select */}
        <Form.Item label="Status" name="statusBoolean">
          <Select style={{ width: "120px" }}>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>

        {/* upload image */}
        <Form.Item
          label="Upload"
          name="thumbUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
            onChange={() => setDefaultImage()}
          >
            <Space direction="vertical">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
              {defaultImage ? (
                <Image
                  src={defaultImage}
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
  );
}
