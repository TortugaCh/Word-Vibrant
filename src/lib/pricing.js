import axios from "axios";

const API_LINK = "/api";

// Fetch all pricing plans
export async function fetchPricingPlans() {
  try {
    const response = await axios.get(`${API_LINK}/plans/get-pricing-plans`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Creare new pricing plan

export async function createPricingPlan(data) {
  try {
    const response = await axios.post(
      `${API_LINK}/plans/create-pricing-plan`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update pricing plan

export async function updatePricingPlan(id,data) {
  console.log(id,data)
  try {

    const response = await axios.put(
      `${API_LINK}/plans/update-pricing-plan/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete pricing plan

export async function deletePricingPlan(id) {
  try {
    const response = await axios.delete(
      `${API_LINK}/plans/delete-pricing-plan/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
