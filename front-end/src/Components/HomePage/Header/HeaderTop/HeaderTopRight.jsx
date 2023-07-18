import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actLogout } from "../../../../store/admin/auth/auth.action";

export default function HeaderTopRight() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);

  const items = [
    {
      key: 1,
      label: <Link to="/user">Tài khoản của tôi</Link>,
    },
    {
      key: 2,
      danger: true,
      label: (
        <span
          onClick={() => {
            dispatch(actLogout());
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  return currentUser ? (
    <Dropdown menu={{ items }}>
      <Space style={{ cursor: "pointer" }}>
        {currentUser.role.toUpperCase()} : {currentUser.username}
        <DownOutlined />
      </Space>
    </Dropdown>
  ) : (
    <>
      <Link to="/register" className="header-link">
        Đăng ký
      </Link>
      <span> | </span>
      <Link to="/login" className="header-link">
        Đăng nhập
      </Link>
    </>
  );
}
