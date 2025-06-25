import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

if (!BACKEND_URL && import.meta.env.DEV) {
  console.warn(
    "VITE_APP_BACKEND_URL is not defined! API calls might fall back to localhost for development."
  );
} else if (!BACKEND_URL && import.meta.env.PROD) {
  console.error(
    "VITE_APP_BACKEND_URL is not defined in production! Admin order functionality may fail."
  );
}

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = await axios.get(`${BACKEND_URL}/api/admin/orders/get`);

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${BACKEND_URL}/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${BACKEND_URL}/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
