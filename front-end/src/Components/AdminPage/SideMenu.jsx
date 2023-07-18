import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  DropboxOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    label: "Category",
    icon: <AppstoreOutlined />,
    key: "/admin",
  },
  {
    label: "Products",
    icon: <DropboxOutlined />,
    key: "/admin/products",
  },
  {
    label: "Users",
    icon: <UserOutlined />,
    key: "/admin/users",
  },
  {
    label: "Carts",
    icon: <ShoppingCartOutlined />,
    key: "/admin/cartAdminPage",
  },
];

export default function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    items.forEach((item) => {
      if (location.pathname.includes(item.key)) {
        setSelectedKey(item.key);
      }
    });
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0
        },
      }}
    >
      <Menu
        theme="dark"
        selectedKeys={selectedKey}
        items={items}
        onClick={(item) => {
          navigate(item.key);
        }}
      />
    </ConfigProvider>
  );
}
