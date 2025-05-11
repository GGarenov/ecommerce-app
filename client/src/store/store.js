import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import shopProductSlice from "./shop/product-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProductSlice: shopProductSlice,
  },
});

export default store;
