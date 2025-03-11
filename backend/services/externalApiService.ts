import axios from "axios";
import { PremiumCalculationRequest } from "../types/premiumTypes";

const BASE_URL = "https://fgt9jf-8080.csb.app"; // External API URL

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getProducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const calculatePremium = async (body: PremiumCalculationRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/premium-calculation`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "1399da23-715d-42af-beb3-2008fd652622",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating premium:", error);
    throw new Error("Failed to calculate premium");
  }
};
