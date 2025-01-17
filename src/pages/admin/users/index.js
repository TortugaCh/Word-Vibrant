import React from "react";
import AdminPanel from "../../../components/AdminPanel/AdminPanel";
import {
  checkUserExists,
  createUserInDB,
  deleteUserData,
  getUsers,
  updateUserData,
} from "../../../lib/utils/user";
import AdminLayout from "../layout";
import { message } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";

const Page = () => {
  const handleSave = async (editingItem, values) => {
    if (editingItem) {
      const res = await updateUserData(editingItem.email, values);
      if (res) message.success("User updated successfully");
      else message.error("Failed to update user");
    } else {
      let user = await checkUserExists(values.email);
      if (user) {
        message.show("User already exists");
      } else {
        try {
          const person = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await createUserInDB(values.email, values.name, person.user.uid);
        } catch (error) {
          console.error("Error creating user:", error);
          message.error("Failed to create user");
        }
      }
    }
  };
  const handleDelete = async (id) => {
    console.log("Delete", id);
    const res = await deleteUserData(id);
    if (res.error) message.error("Failed to delete user");
    else message.success("User deleted successfully");
  };
  const formConfig = [
    { name: "name", label: "Name", type: "text", rules: [{ required: true }] },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: [{ required: true }],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      rules: [{ required: true }],
    },
    {
      name: "credits",
      label: "Credits",
      type: "number",
      rules: [{ required: true }],
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Admin", "User"],
      rules: [{ required: true }],
    },
  ];

  return (
    <AdminLayout>
      <AdminPanel
        title={"Users"}
        fetchData={getUsers}
        formConfig={formConfig}
        handleSave={handleSave}
        handleDelete={handleDelete}
        columnsToFilter={["id", "createdAt","userId"]}
        modalTitle={"User"}
        searchBy={{ label: "Name", key: "name" }}
        sortingOptions={[
          { label: "Credits", value: "credits", orderBy: "none" },
          { label: "Max Credits", value: "maxCredits", orderBy: "desc" },
          { label: "Min Credits", value: "minCredits", orderBy: "asc" },
        ]}
      />
    </AdminLayout>
  );
};

export default Page;
