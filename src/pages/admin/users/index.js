import React from "react";
import AdminPanel from "../../../components/AdminPanel/AdminPanel";
import { getUsers } from "../../../lib/utils";
import AdminLayout from "../layout";

const Page = () => {
  //     title,
  //   fetchData,
  //   columnsConfig = null,
  //   formConfig,
  //   handleSave,
  //   handleDelete,

  const handleSave = async (editingItem, values) => {
    if (editingItem) {
      console.log("Update", values);
    } else {
      console.log("Save", values);
    }
  };
  const handleDelete = async (id) => {
    console.log("Delete", id);
  };
  return (
    <AdminLayout>
      <AdminPanel
        title={"Users"}
        fetchData={getUsers}
        formConfig={[
          {
            name: "name",
            label: "Plan Name",
            type: "text",
            rules: [{ required: true }],
          },
          {
            name: "price",
            label: "Price",
            type: "number",
            rules: [{ required: true }],
          },
          {
            name: "credits",
            label: "Credits",
            type: "number",
            rules: [{ required: true }],
          },
        ]}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default Page;
