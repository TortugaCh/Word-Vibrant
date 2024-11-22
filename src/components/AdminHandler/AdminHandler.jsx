// import React, { useEffect, useState } from "react";
// import { fetchLookupData, addLookupItem, updateLookupItem, deleteLookupItem } from "../../lib/utils";

// const lookupTypes = ["curriculum", "grade", "semester", "wordType"];

// const AdminLookupManager = () => {
//   const [selectedType, setSelectedType] = useState("curriculum");
//   const [lookupData, setLookupData] = useState([]);
//   const [newItemName, setNewItemName] = useState("");
//   const [editingItem, setEditingItem] = useState(null);

//   // Fetch data when the selected type changes
//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchLookupData(selectedType);
//       setLookupData(data);
//     };
//     loadData();
//   }, [selectedType]);

//   const handleAddItem = async () => {
//     if (newItemName.trim() === "") return;
//     const newItem = { name: newItemName, type: selectedType, value: newItemName };
//     await addLookupItem(newItem);
//     setNewItemName("");
//     const updatedData = await fetchLookupData(selectedType);
//     setLookupData(updatedData);
//   };

//   const handleDeleteItem = async (id) => {
//     await deleteLookupItem(id);
//     const updatedData = await fetchLookupData(selectedType);
//     setLookupData(updatedData);
//   };

//   const handleEditItem = (item) => {
//     setEditingItem(item);
//     setNewItemName(item.name);
//   };

//   const handleUpdateItem = async () => {
//     if (!editingItem) return;
//     await updateLookupItem(editingItem.id, { name: newItemName, type: selectedType, value: newItemName });
//     setEditingItem(null);
//     setNewItemName("");
//     const updatedData = await fetchLookupData(selectedType);
//     setLookupData(updatedData);
//   };

//   return (
//     <div>
//       <div className="mb-8">
//         <label className="block mb-2 font-bold">Select Lookup Type:</label>
//         <select
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         >
//           {lookupTypes.map((type) => (
//             <option key={type} value={type}>
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-6 flex gap-4 items-center">
//         <input
//           type="text"
//           value={newItemName}
//           onChange={(e) => setNewItemName(e.target.value)}
//           placeholder="Enter item name"
//           className="p-2 border border-gray-300 rounded"
//         />
//         {editingItem ? (
//           <button onClick={handleUpdateItem} className="bg-yellow-500 text-white px-4 py-2 rounded">
//             Update
//           </button>
//         ) : (
//           <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded">
//             Add
//           </button>
//         )}
//       </div>

//       <table className="min-w-full bg-white border border-gray-200 rounded shadow">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b">Name</th>
//             <th className="px-4 py-2 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lookupData.map((item) => (
//             <tr key={item.id}>
//               <td className="px-4 py-2 border-b">{item.name}</td>
//               <td className="px-4 py-2 border-b">
//                 <button onClick={() => handleEditItem(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminLookupManager;
import React, { useEffect, useState } from "react";
import { fetchLookupData, addLookupItem, updateLookupItem, deleteLookupItem } from "../../lib/utils";
import { message, Form } from "antd";
import CustomTable from "../CustomTable/CustomTable"; 
import CustomModal from "../CustomModal/CustomModal"; 
import FloatingButton from "../FloatingButton/FloatingButton";
import CustomForm from "../Customform/Customform";


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
        const resp=await updateLookupItem(editingItem.id, {
          ...values,
          type: selectedType,
        });
        console.log(resp);
        message.success("Item updated successfully");
      } else {
        // Add new item
        const resp=await addLookupItem({
          ...values,
          type: selectedType,
        });
        console.log(resp);
        message.success("Item added successfully");
      }

      // Refresh data
      const updatedData = await fetchLookupData(selectedType);
      console.log(updatedData)
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
        <CustomForm form={form} />
      </CustomModal>
    </div>
  );
};

export default AdminLookupManager;
