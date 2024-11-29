// import { Drawer, Layout } from "antd";
// import SideBar from "../../components/SideBar/UserSidebar";
// import Template from "../../components/Template";
// import { useState, useEffect } from "react";

// const { Sider, Content } = Layout;

// export default function DashboardLayout({ children, userData, onLogout }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobile, setMobile] = useState(false);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Template userData={userData} onLogout={onLogout}>
//       <Layout className="min-h-screen w-full bg-transparent">
//         {/* Sidebar for desktop */}
//         {!mobile && (
//           <Sider
//             style={{
//               background: "#ffffff",
//               boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
//               height: "calc(100vh - 64px)", // Adjust for header height
//               position: "fixed", // Make it fixed for better UX
//             }}
//             width={300}
//           >
//             <div
//               className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
//               style={{
//                 overflowY: "auto",
//                 padding: "16px",
//               }}
//             >
//               <SideBar />
//             </div>
//           </Sider>
//         )}

//         {/* Drawer for mobile */}
//         {mobile && (
//           <Drawer
//             bodyStyle={{
//               padding: 0,
//               background: "#ffffff",
//             }}
//             width={280}
//             open={menuOpen}
//             placement="left"
//             onClose={() => setMenuOpen(false)}
//           >
//             <div
//               className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
//               style={{
//                 overflowY: "auto",
//                 padding: "16px",
//               }}
//             >
//               <SideBar setMenuOpen={setMenuOpen} />
//             </div>
//           </Drawer>
//         )}

//         {/* Main Content Area */}
//         <Content
//           style={{
//             marginLeft: !mobile ? 300 : 0, // Offset content based on sidebar width
//             marginTop: 0,
//             padding: "20px",
//           }}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
//             }}
//           >
//             {children}
//           </div>
//         </Content>
//       </Layout>
//     </Template>
//   );
// }
// import { Drawer, Layout } from "antd";
// import SideBar from "../../components/SideBar/UserSidebar";
// import Template from "../../components/Template";
// import { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar/Navbar";

// const { Header, Sider, Content } = Layout;

// export default function DashboardLayout({ children, userData, onLogout }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobile, setMobile] = useState(false);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Layout className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50  overflow-hidden">

//         {/* Header */}
//         {/* <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
//         <div className="container mx-auto px-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-purple-600">
//           {t("headerTitle")}
//           </h1>
//           </div>
//           </header> */}

//         {/* Decorative Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="circle1 animate-bounce-slow"></div>
//           <div className="circle2 animate-bounce-slow"></div>
//           <div className="circle3 animate-bounce-slow"></div>
//           <div className="star1 animate-spin-slow">⭐</div>
//           <div className="star2 animate-spin-slow">⭐</div>
//           <div className="star3 animate-spin-slow">⭐</div>
//           <div className="triangle1"></div>
//           <div className="triangle2"></div>
//           <div className="chinese-word1">汉</div>
//           <div className="chinese-word2">字</div>
//         </div>
//       {/* Sidebar for desktop */}
//       {!mobile && (
//         <Sider
//           style={{
//             background: "#ffffff",
//             boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
//             //height: "calc(100vh - 64px)", // Adjust for header height
//             position: "sticky", // Make it fixed for better UX
//           }}
//           width={300}
//         >
//           <SideBar />
//           {/* <div
//             className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
//             style={{
//               overflowY: "auto",
//               padding: "16px",
//             }}
//           > */}
//           {/* </div> */}
//         </Sider>
//       )}

//       {/* Drawer for mobile */}
//       {mobile && (
//         <Drawer
//           style={{
//             padding: 0,
//             background: "#ffffff",
//           }}
//           width={280}
//           open={menuOpen}
//           placement="left"
//           onClose={() => setMenuOpen(false)}
//         >
//           <div
//             className="h-full flex flex-col border-r border-gray-200 custom-scrollbar"
//             style={{
//               overflowY: "auto",
//               padding: "16px",
//             }}
//           >
//             <SideBar setMenuOpen={setMenuOpen} />
//           </div>
//         </Drawer>
//       )}

//       {/* Main Content Area */}
//       {/* <Content
//         style={{
//           marginLeft: !mobile ? 300 : 0, // Offset content based on sidebar width
//           marginTop: 0,
//           padding: "20px",
//         }}
//       >
//         <div
//           className="bg-white rounded-lg shadow-lg p-6"
//           style={{
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
//           }}
//         >
//           {children}
//         </div>
//       </Content> */}
//       <Layout className="bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50  overflow-hidden">
//         <Header className="bg-transparent">
//           <Navbar mobile={mobile} setIsMenuOpen={setMenuOpen} />
//         </Header>
//         <Content className="">
//           <div className="px-12">
//             <h1 className="text-bold font-bold text-2xl mb-10 ml-3">
//               Dashboard
//             </h1>
//             {children}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

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
    <Layout className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50  overflow-hidden">
      {/* Sidebar for desktop */}
      
      {!mobile && (
        <Sider
          style={{
            // background: "rgba(255, 255, 255, 0.1)", // Slightly transparent white background
            backdropFilter: "blur(10px)", // Apply the blur effect for the glass effect
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)", // Add shadow for depth
            position: "sticky", // Make it fixed for better UX
            zIndex: 10, // Ensure it sits above content
            background: "#ffffff",
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
      <Layout className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50  overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="circle1 animate-bounce-slow"></div>{" "}
          <div className="circle2 animate-bounce-slow"></div>
          <div className="circle3 animate-bounce-slow"></div>
          <div className="star1 animate-spin-slow">⭐</div>
          <div className="star2 animate-spin-slow">⭐</div>
          <div className="star3 animate-spin-slow">⭐</div>
          <div className="triangle1"></div>
          <div className="triangle2"></div>
          <div className="chinese-word1">汉</div>
          <div className="chinese-word2">字</div>
        </div>
        <Header className="bg-transparent">
          <Navbar
            mobile={mobile}
            setIsMenuOpen={setMenuOpen}
            userData={userData}
          />
        </Header>
        <Content
          style={{
            zIndex: 10, // Ensure Content has a higher z-index than Sidebar/Drawer
            position: "relative",
          }}
        >
          {/* <div className="px-12">
            <h1 className="text-bold font-bold text-2xl mb-10 ml-3">
              Dashboard
            </h1> */}
          {children}
          {/* </div> */}
        </Content>
      </Layout>
    </Layout>
  );
}
