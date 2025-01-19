import { handleLogout } from "../../lib/utils"; // Adjust the path as needed
import { Drawer, Layout, Button } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import SideBar from "../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader"; // Import your existing Loader component
import { handleLogout } from "../../lib/utils/auth";
const { Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const purpleColor = "#9333EA"; // Set the desired purple color

  // Modify handleLogout to set loading to true when logging out
  const handleLogoutWithLoader = async () => {
    setLoading(true); // Show loader
    try {
      await handleLogout(); // Your existing logout logic
    } finally {
      setLoading(false); // Hide loader after logout is complete
    }
  };

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
        <>
          {/* Hamburger Menu Button */}
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setMenuOpen(true)}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 15,
              backgroundColor: purpleColor, // Purple color
              color: "white", // White icon color
              borderColor: purpleColor, // Purple border color
            }}
          />

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
        </>
      )}

      {/* Main Content Area */}
      <Layout
        className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 overflow-hidden"
        style={{ marginLeft: mobile ? 0 : 300 }}
      >
        {/* Top-right Logout Button */}
        <Button
          type="default"
          icon={<LogoutOutlined />}
          onClick={handleLogout} // Use the modified logout function
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 20,
            borderRadius: "8px",
            padding: "8px 16px",
            backgroundColor: purpleColor, // Purple background color
            color: "white", // White text and icon color
            borderColor: purpleColor, // Purple border color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Logout
        </Button>

        {/* Loader (visible while loading) */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-60 z-30">
            <Loader /> {/* Use your existing loader component */}
          </div>
        )}

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
