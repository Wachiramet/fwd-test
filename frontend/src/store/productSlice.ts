import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  planCode: string;
  packageName: string;
  benefit: string;
}

// Define AsyncThunk
export const fetchProducts = createAsyncThunk<Product[]>("products/fetch", async () => {
  const response = await axios.get("http://localhost:3001/api/getProducts");
  return response.data.data;
});

// Define State Type
interface ProductState {
  list: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductState = {
  list: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
