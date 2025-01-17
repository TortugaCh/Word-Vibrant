import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Input, Select, Form, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { handleSearch, sortData } from "../../lib/utils";
import Loader from "../Loader";
import CustomModal from "../CustomModal/CustomModal";
import CustomForm from "../CustomForm/CustomForm";
import { updateUserData } from "../../lib/utils/user";

const CustomTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  sortBy,
  searchBy,
  sortingOptions,
  tableTitle,
}) => {
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [updatedData, setUpdatedData] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addCreditsModal, setAddCreditsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const startLoading = (callback) => {
    setLoading(true);
    setTimeout(() => {
      callback?.();
      setLoading(false);
    }, 1000);
  };

  const handleSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const updatedCredits = async (record) => {
    try {
      const values = await form.validateFields();
      const resp = await updateUserData(record.email, {
        credits: Number(record?.credits) + Number(values?.credits),
      });
      if (resp.status === 200) {
        return Number(record?.credits) + Number(values?.credits);
      } else {
        throw new Error("Failed to update credits");
      }
    } catch (error) {
      return Number(record?.credits);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleBulkDelete = () => {
    startLoading(() => {
      selectedRowKeys.forEach((key) => onDelete(key));
      setUpdatedData((prev) =>
        prev.filter((item) => !selectedRowKeys.includes(item.id))
      );
      setSelectedRowKeys([]);
    });
  };

  const handleBulkCredits = async () => {
    startLoading(async () => {
      // Filter selected records
      const selectedRecords = updatedData.filter((record) =>
        selectedRowKeys.includes(record.id)
      );
  
      console.log("Selected Records for Bulk Credits:", selectedRecords);
  
      // Create a copy of updatedData to update credits in one go
      const newData = [...updatedData];
  
      // Process each record and update credits
      for (const record of selectedRecords) {
        const newCredits = await updatedCredits(record);
        const index = newData.findIndex((item) => item.id === record.id);
        if (index !== -1) {
          newData[index] = {
            ...newData[index],
            credits: newCredits,
          };
        }
        console.log(`Updated credits for:`, record);
      }
  
      // Update the state with the new data after processing all records
      setUpdatedData(newData);
  
      // Success message and cleanup
      message.success("Credits updated successfully");
      setAddCreditsModal(false);
      setSelectedRowKeys([]);
    });
  };
  

  const renderActions = (record) => (
    <div>
      <Button
        type="link"
        onClick={() => onEdit(record)}
        style={{ color: "#1890ff" }}
        icon={<EditOutlined />}
      />
      <Popconfirm
        title="Are you sure to delete this record?"
        onConfirm={() => onDelete(record.id)}
        okText="Yes"
        cancelText="No"
        icon={<DeleteOutlined />}
      >
        <Button
          type="link"
          style={{ color: "#ff4d4f" }}
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </div>
  );

  const renderSearchInput = () => (
    <Input
      placeholder={`Search By ${searchBy?.label}`}
      className="w-[300px] h-14 text-sm text-main border bg-[#f8f9fa] rounded-md px-4"
      style={{ border: "2px solid #f8f9fa", borderRadius: "10px" }}
      value={search}
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
  );

  const renderSortSelect = () => (
    <Select
      placeholder={`Sort By ${sortingOptions[0]?.label}`}
      className="h-14 w-[300px] text-sm text-main border bg-dry rounded-md ml-auto"
      style={{
        backgroundColor: "#f8f9fa",
        border: "2px solid #f8f9fa",
        borderRadius: "10px",
      }}
      options={sortingOptions}
      dropdownStyle={{ backgroundColor: "#f8f9fa" }}
      onChange={(value) => {
        const selectedOption = sortingOptions.find(
          (opt) => opt.value === value
        );
        sortData(selectedOption, setUpdatedData, data, sortBy);
      }}
    />
  );

  return !updatedData ? (
    <Loader />
  ) : (
    <div className="bg-white px-14 py-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        {searchBy && renderSearchInput()}
        {sortingOptions && renderSortSelect()}
        {selectedRowKeys.length > 1 && (
          <div className="flex gap-3">
            <Popconfirm
              title="Are you sure to delete selected rows?"
              onConfirm={handleBulkDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                loading={loading}
              >
                Delete Selected
              </Button>
            </Popconfirm>
            {tableTitle === "Users" && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                loading={loading}
                onClick={() => setAddCreditsModal(true)}
              >
                Add Credits
              </Button>
            )}
          </div>
        )}
      </div>

      <Table
        columns={[
          ...columns,
          { title: "Actions", key: "actions", render: renderActions },
        ]}
        rowSelection={rowSelection}
        dataSource={updatedData}
        rowKey="id"
        bordered
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
      />

      <CustomModal
        visible={addCreditsModal}
        title="Add Credits"
        onCancel={() => setAddCreditsModal(false)}
        onOk={handleBulkCredits}
      >
        <CustomForm
          form={form}
          inputs={[
            {
              name: "credits",
              label: "Credits",
              type: "number",
              rules: [{ required: true }],
            },
          ]}
        />
      </CustomModal>
    </div>
  );
};

export default CustomTable;
