import { Request, Response } from "express";
import {
  fetchProducts,
  calculatePremium,
} from "../services/externalApiService";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await fetchProducts();
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const premiumCalculation = async (req: Request, res: Response) => {
  try {
    const data = await calculatePremium(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error calculating premium" });
  }
};
