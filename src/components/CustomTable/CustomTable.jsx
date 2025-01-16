import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { handleSearch, sortData } from "../../lib/utils";
import Loader from "../Loader";

const CustomTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  sortBy,
  searchBy,
  sortingOptions,
}) => {
  const [search, setSearch] = useState("");
  const [updatedData, setUpdatedData] = useState(data);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);
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

  return !updatedData ? (
    <Loader />
  ) : (
    <div className="bg-white px-14 py-4 rounded-2xl">
      <div className={`flex justify-between items-center mb-4 flex-wrap gap-3`}>
        {searchBy && (
          <Input
            placeholder={`Search ${`By ${searchBy?.label}`}... `}
            className="w-[300px] h-14 text-sm text-main border bg-[#f8f9fa] rounded-md px-4"
            value={search}
            style={{ border: "2px solid #f8f9fa", borderRadius: "10px" }}
            onChange={(e) =>
              handleSearch(
                e.target.value,
                setSearch,
                setUpdatedData,
                data,
                searchBy?.key
              )
            }
          />
        )}

        {sortingOptions && (
          <Select
            placeholder={`Sort By ${sortingOptions[0]?.label}`}
            className="h-14 w-[300px] text-sm text-main border bg-dry rounded-md ml-auto" // Add ml-auto for right alignment
            options={sortingOptions}
            style={{
              backgroundColor: "#f8f9fa",
              borderColor: "#f8f9fa",
              borderRadius: "10px",
              border: "2px solid #f8f9fa",
            }}
            dropdownStyle={{ backgroundColor: "#f8f9fa" }}
            onChange={(value, option) => {
              const selectedOption = sortingOptions.find(
                (opt) => opt.value === value
              );
              sortData(selectedOption, setUpdatedData, data, sortBy);
            }}
          />
        )}
      </div>
      <Table
        columns={[...columns, actionColumn]}
        dataSource={updatedData}
        rowKey="id"
        bordered
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CustomTable;
