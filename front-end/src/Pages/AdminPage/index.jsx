import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SideMenu from "../../Components/AdminPage/SideMenu";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
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
