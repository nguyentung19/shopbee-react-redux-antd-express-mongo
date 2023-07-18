import React, { useState } from "react";
import { Table, Image, Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CategoryNewDrawer from "./CategoryNewDrawer";
import { actDeleteCategoryAsync } from "../../../store/admin/category/action";
import CategoryEditModal from "./CategoryEditModal";

import { useEffect } from "react";
import { actFetchAllCategoriesAsync } from "../../../store/admin/category/action";

export default function Category() {
  const categories = useSelector((state) => state.Category.categories);
  const dispatch = useDispatch();

  const [addNewCategory, setAddNewCategory] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setRowKeys] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(actFetchAllCategoriesAsync());
  }, [dispatch]);

  const dataSource = categories.map((category, index) => {
    return {
      key: category._id,
      id: index + 1,
      name: category.name,
      thumbUrl: category.image,
      statusBoolean: category.statusBoolean,
      ...category,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (recordOne, recordTwo) => {
        return recordOne.id > recordTwo.id;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (recordOne, recordTwo) =>
        recordOne.name.localeCompare(recordTwo.name),
    },
    {
      title: "Image",
      dataIndex: "thumbUrl",
      render: (thumbUrl) => {
        return (
          <Image
            src={thumbUrl}
            alt={thumbUrl}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "statusBoolean",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => {
        return record.statusBoolean === value;
      },
      render: (statusBoolean) => {
        return statusBoolean ? "Active" : "Inactive";
      },
    },
    {
      title: "Edit",
      render: (record) => {
        return (
          <EditOutlined
            style={{ fontSize: "25px" }}
            onClick={() => {
              setEditModal(true);
              setEditRecord(record);
            }}
          />
        );
      },
    },
    {
      title: "Delete",
      render: (record) => {
        return (
          <Popconfirm
            title="Are you sure?"
            onConfirm={() =>
              dispatch(actDeleteCategoryAsync(record._id)).then(() => {
                messageApi.success("Deleted successfully");
                setRowKeys([]);
              })
            }
          >
            <DeleteOutlined style={{ fontSize: "25px", color: "red" }} />
          </Popconfirm>
        );
      },
    },
  ];

  const formatedColumns = columns.map((column) => {
    const numberOfColumns = 6;
    return {
      ...column,
      align: "center",
      width: `${100 / numberOfColumns}%`,
    };
  });

  const handleDeleteManyCategories = (selectedCategories) => {
    let selectedIdArray = [];

    selectedCategories.forEach((category) => {
      selectedIdArray.push(category._id);
    });

    dispatch(actDeleteCategoryAsync(selectedIdArray))
      .then(() => {
        message.success("Delete Successfully");
        setRowKeys([]);
        setSelectedRows([]);
      })
      .catch((error) => {
        message.error(error);
      });

    return selectedIdArray;
  };

  return (
    <>
      {contextHolder}
      {/* HEADER */}
      <Space
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Popconfirm
          title="Are you sure?"
          disabled={selectedRows.length > 1 ? false : true}
          onConfirm={() => handleDeleteManyCategories(selectedRows)}
        >
          <Button
            danger
            size="large"
            disabled={selectedRows.length > 1 ? false : true}
          >
            Delete many
          </Button>
        </Popconfirm>
        <Button
          type="primary"
          size="large"
          onClick={() => setAddNewCategory(true)}
        >
          Add new
        </Button>
      </Space>

      {/* TABLE */}
      <Table
        columns={formatedColumns}
        dataSource={dataSource}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedKeys, selectedRows) => {
            setRowKeys(selectedKeys);
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          pageSize: 5,
          total: dataSource.length,
        }}
        bordered
      />

      {/* Add new Drawer */}
      <CategoryNewDrawer
        addNewCategory={addNewCategory}
        setAddNewCategory={setAddNewCategory}
      />

      {/* Edit new modal */}
      <CategoryEditModal
        editModal={editModal}
        setEditModal={setEditModal}
        editRecord={editRecord}
      />
    </>
  );
}
