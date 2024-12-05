import React, { useState } from "react";
import { MessageOutlined } from "@ant-design/icons"; // Ensure the icon library is installed

const CollapsibleNotificationPanel = ({
  initialCollapsed = true,
  messages = [],
  title = "Notifications",
  onToggle = () => {},
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed); // Callback for parent
  };

  return (
    <>
      {isCollapsed ? (
        // Collapsed button
        <div
          className="fixed top-24 right-8 w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-30"
          onClick={handleToggle}
        >
          <MessageOutlined style={{ fontSize: 20, color: "white" }} />
        </div>
      ) : (
        // Expanded panel
        <div
          className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30 transition-transform transform duration-500 ease-in-out"
          style={{
            boxShadow: `
              0 0 0 3px #9333EA, 
              0 0 0 6px #F9AF42, 
              0 0 0 9px #9333EA
            `,
          }}
        >
          <button
            onClick={handleToggle}
            className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-purple-600 transition"
          >
            ×
          </button>
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            {title}
          </h3>
          <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 mb-2 rounded-lg shadow-md text-purple-800 text-sm ${
                  msg.sender === "bot"
                    ? "bg-gradient-to-r from-purple-100 to-purple-200"
                    : "bg-gradient-to-r from-blue-100 to-blue-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CollapsibleNotificationPanel;
