import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import premiumReducer from "./premiumSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    premium: premiumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
