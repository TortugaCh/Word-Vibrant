import { Avatar, Button, Dropdown, Menu } from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  CrownOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { handleLogout } from "../../lib/utils/auth";
import { useRouter } from "next/router";

export default function Navbar({
  mobile,
  setIsMenuOpen,
  userData,
  userCredits,
}) {
  const router = useRouter();
  const { locale } = router;
  const items = [
    {
      key: "1",
      label: (
        <Link href="/" onClick={() => handleLogout()}>
          <LogoutOutlined style={{ marginRight: 8, color: "#9333EA" }} />{" "}
          {/* Icon matches text */}
          {/* {t("logout")} */}
          {locale === "zh" ? "登出" : "Logout"}
          {/* Logout */}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <DollarCircleOutlined style={{ marginRight: 8, color: "#FFD700" }} />
          {locale === "zh" ? "點數:" : "Credits:"} {userCredits}
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <CrownOutlined style={{ marginRight: 8, color: "#a7bace" }} />
          {locale === "zh" ? "計劃:" : "Plan:"} {userData?.planName}
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/pricing">
          <CrownOutlined style={{ marginRight: 8, color: "#9333EA" }} />
          {locale === "zh" ? "升級您的計劃" : "Upgrade Your Plan"}
        </Link>
      ),
    },
  ];

  const menu = (
    <Menu
      items={items}
      style={{
        backgroundColor: "#fff", // White background for the dropdown
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        border: "2px solid #9333EA", // Purple border
        transition: "all 0.3s ease-in-out",
      }}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            margin: "4px 0",
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#9333EA"; // Purple background on hover
            e.currentTarget.style.color = "#fff"; // White text on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"; // Revert background color
            e.currentTarget.style.color = "#000"; // Default text color
          }}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex items-center px-4 py-2 w-full">
    {/* Burger Menu Button - Left */}
    {mobile && (
      <Button
        icon={<MenuOutlined />}
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
        className="flex-shrink-0"
        style={{
          backgroundColor: "#9333EA",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
    )}
  
    {/* Profile Button - Right */}
    <div className="ml-auto">
      <Dropdown
        overlay={menu}
        trigger={["hover"]}
        placement="bottomRight"
        overlayStyle={{
          minWidth: "200px",
        }}
      >
        <Button
          type="text"
          className="flex items-center px-4 py-2"
          style={{
            backgroundColor: "#9333EA",
            color: "#fff",
            borderRadius: "24px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            border: "2px solid #ffffff",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
          }}
        >
          <Avatar
            size="large"
            icon={
              <UserOutlined style={{ fontSize: "18px", color: "#fff" }} />
            }
            style={{
              backgroundColor: "#9333EA",
              marginRight: "8px",
              border: "2px solid #ffffff",
            }}
          />
          <span
            style={{
              fontFamily: "'Pacifico', cursive",
              color: "#fff",
              fontSize: "16px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {userData?.name || "Guest"}
          </span>
        </Button>
      </Dropdown>
    </div>
  </div>
  
  );
}

// export const getServerSideProps = withMessages("strokeOrder");
