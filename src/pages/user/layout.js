import { Drawer, Layout } from "antd";
import SideBar from "../../components/SideBar/UserSidebar";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useUserContext } from "../../context/UserContext";

const { Header, Sider, Content, Footer } = Layout;

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { userData, userCredits } = useUserContext();

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for desktop */}
      {!mobile && (
        <Sider
          width={300}
          style={{
            backgroundImage:
              "url('/images/monkey.png'), linear-gradient(to right, white, white)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
            height: "100vh",
            position: "sticky", // Ensures sidebar stays fixed
            top: 0,
          }}
        >
          <SideBar />
        </Sider>
      )}

      {/* Drawer for mobile */}
      {mobile && (
        <Drawer
          open={menuOpen}
          placement="left"
          width={280}
          onClose={() => setMenuOpen(false)}
          style={{
            backgroundImage: "url('/images/monkey.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <SideBar setMenuOpen={setMenuOpen} />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header
          style={{
            background: "white",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Navbar
            mobile={mobile}
            setIsMenuOpen={setMenuOpen}
            userData={userData}
            userCredits={userCredits}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: "24px",
            margin: "24px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            flex: 1, // Ensures Content expands to take available height
            overflow: "auto",
          }}
        >
          {children}
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "#EDDDFF",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            padding: "16px",
          }}
        >
          © {new Date().getFullYear()} 語動. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
}
