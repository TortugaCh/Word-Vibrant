import { Card, Col, Row, Typography, Button, Badge } from "antd";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SplineChart from "../SplineChart/SplineChart";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";
const { Text } = Typography;

const moduleColors = [
  "rgb(232, 141, 51)", // Red-200
  "rgb(51, 232, 102)", // Blue-200
  "rgb(232, 51, 93)", // Green-200
  "rgb(226, 232, 51)", // Yellow-200
];

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

const getRandomProgressCardColor = () =>
  progressCardColors[Math.floor(Math.random() * progressCardColors.length)];

const getModuleColor = (moduleIndex) =>
  moduleColors[moduleIndex % moduleColors.length];

const Progress = ({ userId, t }) => {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const { userData,userCredits } = useUserContext();
  const [collapsedModules, setCollapsedModules] = useState({});
  const router = useRouter();
  const { locale } = router;

  const ProgressCard = ({ word }) => (
    <Card
      style={{
        margin: "10px 0",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: getRandomProgressCardColor(),
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
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
        setUserProgress(userProgress.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserProgress();
  }, [userId]);

  const aggregateCreditsByDay = (progressData) => {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    console.log("Progress Data:", progressData);
    progressData.forEach((progress) => {
      const fireBaseTime = new Date(
        progress.spentDate.seconds * 1000 +
          progress.spentDate.nanoseconds / 1000000
      );
      const spentDate = fireBaseTime; // Convert Firestore timestamp to Date
      const dayName = format(spentDate, "EEEE"); // Get the full day name (e.g., "Monday")
      daysOfWeek[dayName] += progress.creditsSpent;
    });

    return {
      labels: Object.keys(daysOfWeek),
      data: Object.values(daysOfWeek),
    };
  };
  const { labels, data } = aggregateCreditsByDay(userProgress);

  return (
    <div
      style={{
        padding: "20px",
        width: "95%",
        margin: "0 auto",
        maxHeight: "100vh",
        overflowY: "auto",
        position: "relative",
      }}
      className="scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 scrollbar-thumb-rounded hover:scrollbar-thumb-purple-500 focus:scrollbar-thumb-purple-300"
    >
      <Row gutter={[16, 16]}>
        {modules
          ?.filter(
            (module) =>
              module.value !== "create-a-story" &&
              module.value !== "create-a-dialogue"
          )
          .map((module, index) => {
            const hasProgress =
              userProgress?.filter((progress) => progress.name === module.value)
                .length > 0;
            const moduleColor = getModuleColor(index);

            const isScrollable =
              hasProgress &&
              userProgress?.filter((progress) => progress.name === module.value)
                .length > 5;

            return (
              <Col span={12} key={module.name} xs={24} sm={12} md={8} lg={6}>
                <div
                  style={{
                    position: "relative",
                    padding: "10px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
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

                  {/* Scrollable content area */}
                  <div
                    style={{
                      maxHeight: isScrollable ? "550px" : "unset",
                      overflowY: isScrollable ? "auto" : "unset",
                      paddingBottom: "40px", // Space for the button
                    }}
                    className="scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 scrollbar-thumb-rounded hover:scrollbar-thumb-purple-500 focus:scrollbar-thumb-purple-300"
                  >
                    {!collapsedModules[module.value] && hasProgress && (
                      <div style={{ marginTop: "10px", textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            backgroundColor: moduleColor,
                            color: "#fff",
                            borderRadius: "16px",
                            padding: "4px 12px",
                            display: "inline-block",
                            marginBottom: "10px",
                            maxWidth: "120px",
                            textAlign: "center",
                          }}
                        >
                          {t("status.learned")}
                        </div>
                        {console.log(userProgress)}
                        {userProgress
                          ?.filter((progress) => progress.name === module.value)
                          ?.map((progress, wordIndex) => (
                            <ProgressCard
                              key={wordIndex}
                              word={progress?.word}
                            />
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Collapse/Expand Button at the bottom */}
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
                        bottom: "-20px", // Button appears to be outside the container, but within the bounds
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
        <Col xs={24} sm={24} md={24} lg={12}>
          <div
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "8px",
              padding: "20px",
              height: "100%",
            }}
          >
            <div className="flex justify-between ">
              <div>
                <Text className="text-2xl font-semibold my-4">
                  {/* {t("Graph Overview")} */}
                  Plan: {userData?.planName}
                </Text>
                <br />
                <Text className="text-gray-500">
                  Plan Credits:{userData?.planCredits}
                </Text>
              </div>
              <div>
                <Text className="text-2xl font-semibold my-4">
                  {/* {t("Graph Overview")} */}
                  {/* Total Credits: {userCredits+ userProgress?.reduce((acc, curr) => acc + curr.creditsSpent, 0)} */}
                  Remaining Credits: {userCredits}

                </Text>
                <br />
                <Text className="text-gray-500">
                  Credits Spent:{userProgress?.reduce ? userProgress.reduce((acc, curr) => acc + curr.creditsSpent, 0) : 0}
                </Text>
              </div>
            </div>
            {/* Replace this with your actual graph component */}
            <div
              style={{
                height: "200px",
                backgroundColor: "#e5e7eb",
                borderRadius: "8px",
              }}
            >
              <SplineChart
                data={data}
                labels={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
                label="Credits Spent"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Progress;
