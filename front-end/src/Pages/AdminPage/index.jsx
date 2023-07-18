import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SideMenu from "../../Components/AdminPage/SideMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <Layout className="AdminPage">
      <Sider>
        <SideMenu />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
