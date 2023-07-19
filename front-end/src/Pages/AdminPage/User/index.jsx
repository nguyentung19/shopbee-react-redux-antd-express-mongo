import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteSingleUserAsync,
  actFetchUsersAsync,
} from "../../../store/admin/user/action.user";
import UserNewDrawer from "./UserNewDrawer";
import Highlighter from "react-highlight-words";

export default function UserAdmin() {
  const users = useSelector((state) => state.UserAdmin.users);
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState("");
  const [addNewUser, setAddNewUser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    dispatch(actFetchUsersAsync());
  }, [dispatch]);

  let dataSource = users.map((user, index) => {
    return {
      key: user._id,
      id: index + 1,
      ...user,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Role",
      dataIndex: "role",
      //   filters: [
      //     { text: "Admin", value: "admin" },
      //     { text: "User", value: "user" },
      //   ],
      //   onFilter: (value, record) => {
      //     return record.role === value;
      //   },
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.email)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase().toString()) ||
          String(record.address)
            .toLocaleLowerCase()
            .includes(value.toString().toLocaleLowerCase()) ||
          String(record.role)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    // },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Delete",
      render: (record) => {
        return (
          <Popconfirm
            title="Are you sure"
            onConfirm={ () => {
              dispatch(actDeleteSingleUserAsync(record.key)).then(
                (result) => {
                  if (result.success) {
                    messageApi.success("Delete successfully");
                  }
                }
              );
            }}
          >
            <DeleteOutlined style={{ fontSize: 25, color: "red" }} />
          </Popconfirm>
        );
      },
    },
  ];

  const formatColumns = columns.map((column) => {
    const numberOfColumns = 7;

    if (column.title !== "Delete") {
      return {
        ...column,
        align: "center",
        width: `${100 / numberOfColumns}%`,
        render: (text) => {
          return (
            <Highlighter
              highlightStyle={{
                backgroundColor: "yellow",
                padding: 0,
              }}
              autoEscape
              searchWords={[searchedText]}
              textToHighlight={text ? text.toString() : ""}
            />
          );
        },
      };
    } else {
      return {
        ...column,
        align: "center",
        width: `${100 / numberOfColumns}%`,
      };
    }
  });

  const handleDeleteManyUsers = (id) => {
    dispatch(actDeleteSingleUserAsync(id)).then((result) => {
      if (result.success) {
        messageApi.success("Delete successfully!!!");
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Space
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* delete */}
        <Popconfirm
          title="Are you sure?"
          disabled={selectedKeys.length > 1 ? false : true}
          onConfirm={() => handleDeleteManyUsers(selectedKeys)}
        >
          <Button
            size="large"
            danger
            disabled={selectedKeys.length > 1 ? false : true}
          >
            Delete many
          </Button>
        </Popconfirm>

        {/* Search input */}
        <Input.Search
          placeholder="Search here..."
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(event) => {
            setSearchedText(event.target.value);
          }}
        />

        {/* add new */}
        <Button size="large" type="primary" onClick={() => setAddNewUser(true)}>
          Add New
        </Button>
      </Space>

      {/* Table */}
      <Table
        columns={formatColumns}
        dataSource={dataSource}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedKeys) => {
            setSelectedKeys(selectedKeys);
          },
        }}
        bordered
        size="small"
      />

      {/* Add New Drawer */}
      <UserNewDrawer setAddNewUser={setAddNewUser} addNewUser={addNewUser} />
    </>
  );
}
