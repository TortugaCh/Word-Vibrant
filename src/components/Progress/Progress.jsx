import { Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Progress = ({ userId }) => {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const ProgressCard = ({ moduleName, word }) => {
    return (
      <Card
        style={{ margin: "10px" }}
        title={`Learned in ${moduleName}`}
        bordered={false}
        hoverable
      >
        <p>Word: {word}</p>
        <p>Status: Learned</p> {/* You can customize this to show progress */}
      </Card>
    );
  };

  useEffect(() => {
    // Fetch user progress
    const fetchUserProgress = async () => {
      // Fetch user progress from the database
      const userProgress = await axios.get(`/api/progress/${userId}`);
      const getModules = await axios.get(`/api/modules/get-modules`);
      console.log(getModules.data.data);
      setModules(getModules.data.data);

      console.log(userProgress.data.data);
      setUserProgress(userProgress.data.data);
    };
    fetchUserProgress();

    // Cleanup function
    return () => {
      // Cleanup code
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {modules &&
          modules?.map((module) => (
            <Col span={12} key={module.name}>
              <div style={{ padding: "10px" }}>
                <h3>{module.name}</h3>
                {userProgress[module.value] ? (
                  userProgress[module.value].map((word, index) => (
                    <ProgressCard
                      key={index}
                      moduleName={module.name}
                      word={word}
                    />
                  ))
                ) : (
                  <p>No progress data available for this module.</p>
                )}
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Progress;
