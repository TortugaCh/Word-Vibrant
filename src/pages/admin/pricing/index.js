import React from "react";
import AdminPanel from "../../../components/AdminPanel/AdminPanel";
import AdminLayout from "../layout";
import {
  createPricingPlan,
  deletePricingPlan,
  fetchPricingPlans,
  updatePricingPlan,
} from "../../../lib/pricing";

const Page = () => {
  const handleSave = async (editingItem, values) => {
    if (editingItem) {
      await updatePricingPlan(editingItem.id, values);
    } else {
      await createPricingPlan(values);
    }
  };
  const handleDelete = async (id) => {
    await deletePricingPlan(id);
  };
  const formConfig = [
    { name: "name", label: "Name", type: "text", rules: [{ required: true }] },
    {
      name: "nameZh",
      label: "NameZh",
      type: "text",
      rules: [{ required: true }],
    },
    {
      name: "priceId",
      label: "PriceId",
      type: "text",
      rules: [{ required: true }],
    },
    {
      name: "productId",
      label: "ProductId",
      type: "text",
      rules: [{ required: true }],
    },
    {
      name: "cost",
      label: "Cost",
      type: "number",
      rules: [{ required: true }],
    },
    {
      name: "credits",
      label: "Credits",
      type: "number",
      rules: [{ required: true }],
    },
  ];

  return (
    <AdminLayout>
      <AdminPanel
        title={"Plans"}
        fetchData={fetchPricingPlans}
        formConfig={formConfig}
        handleSave={handleSave}
        handleDelete={handleDelete}
        columnsToFilter={[
          "features",
          "id",
          "updatedAt",
          "createdAt",
          "description",
          "descriptionZh",
        ]}
        modalTitle={"Plan"}
        searchBy={{ label: "Name", key: "name" }}
        sortingOptions={[
          {
            label: "Cost",
            value: "cost",
            orderBy: "none",
          },
          { label: "Min Cost", value: "minCost", orderBy: "asc" },
          { label: "Max Cost", value: "maxCost", orderBy: "desc" },
        ]}
      />
    </AdminLayout>
  );
};

export default Page;
