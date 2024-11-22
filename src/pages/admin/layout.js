import { Drawer, Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
const { Sider, Content } = Layout;
export default function AdminLayout({ children, title }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  return (
    <Layout className=" min-h-screen h-[100vh]">
      {!mobile && (
        <Sider
          style={{
            background: "white",
            position: "sticky",
          }}
          width={340}
        >
          <SideBar />
        </Sider>
      )}
      {mobile && (
        <Drawer
          style={{
            background: "white",
            position: "sticky",
          }}
          width={275}
          collapsed={menuOpen}
          onCollapse={() => setMenuOpen(!menuOpen)}
          open={menuOpen}
          placement="left"
          onClose={() => setMenuOpen(false)}
        >
          <SideBar setMenuOpen={setMenuOpen} />
        </Drawer>
      )}

      <Content className="xs:px-8 px-2 py-20 ">
        <div className="px-12">{children}</div>
      </Content>
    </Layout>
  );
}
