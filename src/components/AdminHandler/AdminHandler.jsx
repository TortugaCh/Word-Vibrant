import React, { useEffect, useState } from "react";
import {
  fetchLookupData,
  addLookupItem,
  updateLookupItem,
  deleteLookupItem,
} from "../../lib/utils";
import { message, Form } from "antd";
import CustomTable from "../CustomTable/CustomTable";
import CustomModal from "../CustomModal/CustomModal";
import FloatingButton from "../FloatingButton/FloatingButton";
import CustomForm from "../CustomForm/CustomForm";

const lookupTypes = ["curriculum", "grade", "semester", "wordType"];

const AdminLookupManager = () => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState("curriculum");
  const [lookupData, setLookupData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data when the selected type changes
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchLookupData(selectedType);
      setLookupData(data);
    };
    loadData();
  }, [selectedType]);

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

  const handleSave = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      console.log(values);
      if (editingItem) {
        // Update existing item
        const resp = await updateLookupItem(editingItem.id, {
          ...values,
          type: selectedType,
        });
        console.log(resp);
        message.success("Item updated successfully");
      } else {
        // Add new item
        const resp = await addLookupItem({
          ...values,
          type: selectedType,
        });
        console.log(resp);
        message.success("Item added successfully");
      }

      // Refresh data
      const updatedData = await fetchLookupData(selectedType);
      console.log(updatedData);
      setLookupData(updatedData);

      closeModal();
    } catch (error) {
      message.error("Failed to save the item");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteLookupItem(id);
      const updatedData = await fetchLookupData(selectedType);
      setLookupData(updatedData);
      message.success("Item deleted successfully");
    } catch (error) {
      message.error("Failed to delete the item");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NameZh",
      dataIndex: "nameZh",
      key: "nameZh",
    },
  ];

  const formConfig = [
    { name: "name", label: "Name", type: "text", rules: [{ required: true }] },
    { name: "nameZh", label: "NameZh", type: "text", rules: [{ required: true }] },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Select Lookup Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px" }}
        >
          {lookupTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <CustomTable
        columns={columns}
        data={lookupData}
        onEdit={openModal}
        onDelete={handleDeleteItem}
      />

<FloatingButton onClick={() => openModal()} />

      <CustomModal
        visible={isModalVisible}
        title={editingItem ? "Edit Item" : "Add Item"}
        onOk={handleSave}
        onCancel={closeModal}
        confirmLoading={confirmLoading}
      >
        <CustomForm form={form} inputs={formConfig} />
      </CustomModal>
    </div>
  );
};

export default AdminLookupManager;
