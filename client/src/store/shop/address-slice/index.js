import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

if (!BACKEND_URL && import.meta.env.DEV) {
  console.warn(
    "VITE_APP_BACKEND_URL is not defined! API calls might fall back to localhost for development."
  );
} else if (!BACKEND_URL && import.meta.env.PROD) {
  console.error(
    "VITE_APP_BACKEND_URL is not defined in production! Address functionality may fail."
  );
}

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/shop/address/add`,
      formData
    );

    return response.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/addresses/fetchAllAddress",
  async (userId) => {
    const response = await axios.get(
      `${BACKEND_URL}/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${BACKEND_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${BACKEND_URL}/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
