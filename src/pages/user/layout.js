import { Drawer, Layout } from "antd";
import SideBar from "../../components/SideBar/UserSidebar";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useUserContext } from "../../context/UserContext";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { userData, userCredits } = useUserContext();

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
    <Layout className="relative min-h-screen bg-white">
      {/* Sidebar for desktop */}
      {!mobile && (
        <Sider
          style={{
            backgroundImage:
              "url('/images/monkey.png'), linear-gradient(to right, white, white)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 10,
            width: 300,
            overflowY: "auto",
          }}
          width={300}
        >
          <SideBar />
        </Sider>
      )}

      {/* Drawer for mobile */}
      {mobile && (
        <Drawer
          style={{
            padding: 0,
            backgroundImage: "url('/images/monkey.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            minHeight: "100vh",
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
      <Layout
        style={{
          marginLeft: mobile ? 0 : 300,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <Header
          className="bg-white shadow-md flex items-center"
          style={{
            position: "fixed",
            top: 0,
            zIndex: 20,
            width: "100%",
            padding: "0 24px",
          }}
        >
          <Navbar
            mobile={mobile}
            setIsMenuOpen={setMenuOpen}
            userData={userData}
            userCredits={userCredits}
          />
        </Header>

        {/* Main Content with clean right-side UI */}
        <Content
          className="p-8 relative z-10"
          style={{
            marginTop: "80px",
            marginRight: "24px",
            marginLeft: "24px",
            background: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          {/* Decorative Shapes */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-[#7e57c2] to-[#b74fae] rounded-full opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-[#eea72e] rounded-full opacity-20"></div>

          {/* Content */}
          <div className="relative z-20">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
