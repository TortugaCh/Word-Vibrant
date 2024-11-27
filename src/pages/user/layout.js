import { Drawer, Layout } from "antd";
import SideBar from "../../components/SideBar/UserSidebar";
import Template from "../../components/Template";
import { useState, useEffect } from "react";

const { Sider, Content } = Layout;

export default function DashboardLayout({ children, userData, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Template userData={userData} onLogout={onLogout}>
      <Layout className="min-h-screen w-full bg-transparent">
        {/* Sidebar for desktop */}
        {!mobile && (
          <Sider
            style={{
              background: "#ffffff",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
              height: "calc(100vh - 64px)", // Adjust for header height
              position: "fixed", // Make it fixed for better UX
            }}
            width={300}
          >
            <div
              className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
              style={{
                overflowY: "auto",
                padding: "16px",
              }}
            >
              <SideBar />
            </div>
          </Sider>
        )}

        {/* Drawer for mobile */}
        {mobile && (
          <Drawer
            bodyStyle={{
              padding: 0,
              background: "#ffffff",
            }}
            width={280}
            open={menuOpen}
            placement="left"
            onClose={() => setMenuOpen(false)}
          >
            <div
              className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
              style={{
                overflowY: "auto",
                padding: "16px",
              }}
            >
              <SideBar setMenuOpen={setMenuOpen} />
            </div>
          </Drawer>
        )}

        {/* Main Content Area */}
        <Content
          style={{
            marginLeft: !mobile ? 300 : 0, // Offset content based on sidebar width
            marginTop: 0,
            padding: "20px",
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Template>
  );
}
