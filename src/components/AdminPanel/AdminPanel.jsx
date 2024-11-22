import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import CustomTable from "../CustomTable/CustomTable";
import CustomModal from "../CustomModal/CustomModal";
import FloatingButton from "../FloatingButton/FloatingButton";
import CustomForm from "../Customform/Customform";

const AdminPanel = ({
  title,
  fetchData,
  columnsConfig = null,
  formConfig,
  handleSave,
  handleDelete,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data and dynamically set columns
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);

        if (columnsConfig) {
          setColumns(columnsConfig);
        } else if (result.length > 0) {
          const dynamicColumns = Object.keys(result[0])
            .filter((key) => key !== "updatedAt" && key !== "createdAt")
            .map((key) => ({
              title: key.charAt(0).toUpperCase() + key.slice(1),
              dataIndex: key,
              key,
            }));
          setColumns(dynamicColumns);
        }
      } catch (error) {
        message.error("Failed to fetch data");
      }
    };

    loadData();
  }, [fetchData, columnsConfig]);

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const onSave = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      await handleSave(editingItem, values);
      message.success(editingItem ? "Item updated successfully" : "Item added successfully");

      // Refresh data after saving
      const updatedData = await fetchData();
      setData(updatedData);

      closeModal();
    } catch (error) {
      message.error("Failed to save the item");
    } finally {
      setConfirmLoading(false);
    }
  };
console.log(formConfig);
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <CustomTable columns={columns} data={data} onEdit={openModal} onDelete={handleDelete} />

      <FloatingButton onClick={() => openModal()} />

      <CustomModal
        visible={isModalVisible}
        title={editingItem ? "Edit Item" : "Add Item"}
        onOk={onSave}
        onCancel={closeModal}
        confirmLoading={confirmLoading}
      >
        <CustomForm form={form} inputs={formConfig} />
      </CustomModal>
    </div>
  );
};

export default AdminPanel;
