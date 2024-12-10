import React from "react";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
          icon={<EditOutlined />}
        />
        <Popconfirm
          style={{ color: "#ff4d4f" }}
          icon={<DeleteOutlined />}
          onConfirm={() => onDelete(record.id)}
          description="Are you sure to delete this record"
        >
          <Button
            type="link"
            style={{ color: "#ff4d4f" }}
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </div>
    ),
  };

  return (
    <Table
      columns={[...columns, actionColumn]}
      dataSource={data}
      rowKey="id"
      bordered
      scroll={{ x: true }}
      size="middle"
    />
  );
};

export default CustomTable;
