import React from "react";
import { Table, Button } from "antd";

const CustomTable = ({ columns, data, onEdit, onDelete }) => {
  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: (text, record) => (
      <div>
        <Button
          type="link"
          onClick={() => onEdit(record)}
          style={{ color: "#1890ff" }}
        >
          Edit
        </Button>
        <Button
          type="link"
          onClick={() => onDelete(record.id)}
          style={{ color: "#ff4d4f" }}
        >
          Delete
        </Button>
      </div>
    ),
  };

  return (
    <Table
      columns={[...columns, actionColumn]}
      dataSource={data}
      rowKey="id"
      bordered
    />
  );
};

export default CustomTable;
