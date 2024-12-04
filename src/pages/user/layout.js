import { Drawer, Layout } from "antd";
import SideBar from "../../components/SideBar/UserSidebar";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useUserContext } from "../../context/UserContext";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { userData } = useUserContext();

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
    <Layout className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 overflow-hidden">
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
        className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 overflow-hidden"
        style={{ marginLeft: mobile ? 0 : 300 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Circles */}
          <div className="circle1 animate-bounce-slow"></div>
          <div className="circle2 animate-bounce-slow"></div>
          <div className="circle3 animate-bounce-slow"></div>

          {/* Animated Stars */}
          <div className="star1 animate-spin-slow">⭐</div>
          <div className="star2 animate-spin-slow">⭐</div>
          <div className="star3 animate-spin-slow">⭐</div>

          {/* Animated Shapes */}
          <div className="triangle1"></div>
          <div className="triangle2"></div>

          {/* Chinese Words */}
          <div className="chinese-word1">汉</div>
          <div className="chinese-word2">字</div>
        </div>

        {/* Header */}
        <Header className="bg-transparent">
          <Navbar
            mobile={mobile}
            setIsMenuOpen={setMenuOpen}
            userData={userData}
          />
        </Header>

        {/* Main Content */}
        <Content
          style={{
            zIndex: 10,
            position: "relative",
            padding: "16px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
