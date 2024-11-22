import React, { useEffect, useState } from "react";
import {
  fetchLookupData,
  addLookupItem,
  updateLookupItem,
  deleteLookupItem,
} from "../../../lib/utils";
import { message, Form } from "antd";
import CustomTable from "../../../components/CustomTable/CustomTable";
import CustomModal from "../../../components/CustomModal/CustomModal";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import CustomForm from "../../../components/Customform/Customform";
import { createUserInDB, getUsers } from "../../../lib/utils";
import AdminLayout from "../layout";
import { fetchPricingPlans } from "../../../lib/pricing";
const AdminLookupManager = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data when the selected type changes
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPricingPlans();
      console.log(data)
      setUsers(data?.data);
      // Set columns dynamically based on the data keys
      if (data?.data?.length > 0) {
        const dynamicColumns = Object.keys(data?.data[0])?.filter((key)=> key!=="updatedAt" || key!=="createdAt").map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key for title
          dataIndex: key,
          key,
        }));
        console.log(dynamicColumns);
        setColumns(dynamicColumns);
      }
    };

    loadData();
  }, []);

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
        const resp = await createUserInDB({
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

  return (
    <AdminLayout title="Pricing Plans">
      <div style={{ padding: "20px" }}>
        <CustomTable
          columns={columns}
          data={users}
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
          <CustomForm form={form} />
        </CustomModal>
      </div>
    </AdminLayout>
  );
};

export default AdminLookupManager;
