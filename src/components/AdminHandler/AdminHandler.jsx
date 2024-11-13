import React, { useEffect, useState } from "react";
import { fetchLookupData, addLookupItem, updateLookupItem, deleteLookupItem } from "../../lib/utils";

const lookupTypes = ["curriculum", "grade", "semester", "wordType"];

const AdminLookupManager = () => {
  const [selectedType, setSelectedType] = useState("curriculum");
  const [lookupData, setLookupData] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data when the selected type changes
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchLookupData(selectedType);
      setLookupData(data);
    };
    loadData();
  }, [selectedType]);

  const handleAddItem = async () => {
    if (newItemName.trim() === "") return;
    const newItem = { name: newItemName, type: selectedType, value: newItemName };
    await addLookupItem(newItem);
    setNewItemName("");
    const updatedData = await fetchLookupData(selectedType);
    setLookupData(updatedData);
  };

  const handleDeleteItem = async (id) => {
    await deleteLookupItem(id);
    const updatedData = await fetchLookupData(selectedType);
    setLookupData(updatedData);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;
    await updateLookupItem(editingItem.id, { name: newItemName, type: selectedType, value: newItemName });
    setEditingItem(null);
    setNewItemName("");
    const updatedData = await fetchLookupData(selectedType);
    setLookupData(updatedData);
  };

  return (
    <div>
      <div className="mb-8">
        <label className="block mb-2 font-bold">Select Lookup Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {lookupTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
          className="p-2 border border-gray-300 rounded"
        />
        {editingItem ? (
          <button onClick={handleUpdateItem} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
        ) : (
          <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded">
            Add
          </button>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lookupData.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border-b">{item.name}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => handleEditItem(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLookupManager;
