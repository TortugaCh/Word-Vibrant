import { Card, Col, Row, Typography, Button, Badge } from "antd";
import {
  DownCircleFilled,
  DownCircleOutlined,
  DownOutlined,
  UpCircleFilled,
  UpCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Text } = Typography;

// List of Colors
// List of Static Colors for Modules
const moduleColors = [
  "rgb(232, 141, 51)", // Red-200
  "rgb(51, 232, 102)", // Blue-200
  "rgb(232, 51, 93)", // Green-200
  "rgb(226, 232, 51)", // Yellow-200
];

// Random Colors for Progress Cards
const progressCardColors = [
  "rgba(254, 202, 202, 0.8)", // Red-200
  "rgba(191, 219, 254, 0.8)", // Blue-200
  "rgba(187, 247, 208, 0.8)", // Green-200
  "rgba(253, 230, 138, 0.8)", // Yellow-200
  "rgba(233, 213, 255, 0.8)", // Purple-200
  "rgba(255, 204, 229, 0.8)", // Pink-200
  "rgba(255, 221, 179, 0.8)", // Orange-200
  "rgba(178, 235, 242, 0.8)", // Teal-200
];

// Function to Get a Random Color for Progress Cards
const getRandomProgressCardColor = () =>
  progressCardColors[Math.floor(Math.random() * progressCardColors.length)];

// Function to Assign a Static Color to Each Module
const getModuleColor = (moduleIndex) =>
  moduleColors[moduleIndex % moduleColors.length];

const Progress = ({ userId,t }) => {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [collapsedModules, setCollapsedModules] = useState({});
  const router = useRouter();
  const { locale } = router;
  const ProgressCard = ({ word }) => (
    <Card
      style={{
        margin: "10px 0",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: getRandomProgressCardColor(), // Random color for word containers
        color: "#333", // Ensure text is readable
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px", // Uniform card height
      }}
      bordered={false}
      hoverable
    >
      <Text style={{ fontSize: "14px", fontWeight: "bold" }}>{word}</Text>
    </Card>
  );

  const toggleCollapse = (moduleValue) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleValue]: !prev[moduleValue],
    }));
  };

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const [userProgress, getModules] = await Promise.all([
          axios.get(`/api/progress/${userId}`),
          axios.get(`/api/modules/get-modules`),
        ]);

        setModules(getModules.data.data || []);
        if (modules) console.log(modules);

        setUserProgress(userProgress.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserProgress();
  }, [userId]);

  return (
    <div
      style={{
        padding: "20px",
        width: "95%",
        margin: "0 auto",
      }}
    >
      <Row gutter={[16, 16]}>
        {modules?.map((module, index) => {
          const hasProgress = userProgress[module.value]?.length > 0;
          const moduleColor = getModuleColor(index); // Static color for the module

          return (
            <Col
              span={12}
              key={module.name}
              xs={24}
              sm={12}
              md={8}
              lg={6} // Adjust column span for responsiveness
            >
              <div
                style={{
                  position: "relative",
                  padding: "10px",
                  backgroundColor: "#FFFFFF", // Main container background set to white
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Subtle shadow
                  textAlign: "center",
                }}
              >
                {/* Module Title */}
                <div style={{ padding: "8px", borderRadius: "8px" }}>
                  <Text
                    strong
                    style={{
                      fontSize: "18px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#333",
                    }}
                  >
                    {locale === "en" ? module.name : module.nameZh}
                  </Text>
                </div>

                {/* Progress Area */}
                {!collapsedModules[module.value] && hasProgress && (
                  <div style={{ marginTop: "10px", textAlign: "right" }}>
                    {/* Learned Badge */}
                    <div
                      style={{
                        fontSize: "14px",
                        backgroundColor: moduleColor, // Static color for the "Learned" badge
                        color: "#fff",
                        borderRadius: "16px",
                        padding: "4px 12px",
                        display: "inline-block",
                        marginBottom: "10px",
                        maxWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                     { t("status.learned")}
                    </div>

                    {/* Word Progress Cards */}
                    {userProgress[module.value].map((word, wordIndex) => (
                      <ProgressCard key={wordIndex} word={word} />
                    ))}
                  </div>
                )}

                {/* Collapse/Expand Button */}
                {hasProgress && (
                  <Button
                    shape="circle"
                    icon={
                      collapsedModules[module.value] ? (
                        <DownCircleFilled />
                      ) : (
                        <UpCircleFilled />
                      )
                    }
                    size="small"
                    style={{
                      position: "absolute",
                      bottom: "-15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      backgroundColor: "#f5f5f5",
                      color: "#9333EA",
                      border: "none",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                    onClick={() => toggleCollapse(module.value)}
                  />
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Progress;
