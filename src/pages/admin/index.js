import React, { useEffect, useState } from "react";
import AdminLookupManager from "../../components/AdminHandler/AdminHandler";

const AdminPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
      <AdminLookupManager />
    </div>
  );
};

export default AdminPage;
