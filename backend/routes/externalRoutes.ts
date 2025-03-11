import express from "express";
import {
  getProducts,
  premiumCalculation,
} from "../controllers/externalController";

const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/premium-calculation", premiumCalculation);

export default router;
