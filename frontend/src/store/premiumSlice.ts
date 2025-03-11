import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  PremiumCalculationRequest,
  PremiumCalculationResponse,
} from "../types/premiumTypes";

// Define AsyncThunk
export const calculatePremium = createAsyncThunk<
  PremiumCalculationResponse,
  PremiumCalculationRequest
>("premium/calculate", async (payload) => {
  const response = await axios.post(
    "http://localhost:3001/api/premium-calculation",
    payload
  );
  return response.data.data;
});

// Define State Type
export interface PremiumState {
  result: PremiumCalculationResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PremiumState = {
  result: null,
  status: "idle",
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculatePremium.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        calculatePremium.fulfilled,
        (state, action: PayloadAction<PremiumCalculationResponse>) => {
          state.result = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(calculatePremium.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default premiumSlice.reducer;
