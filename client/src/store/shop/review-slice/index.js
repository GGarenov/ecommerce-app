import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

if (!BACKEND_URL && import.meta.env.DEV) {
  console.warn(
    "VITE_APP_BACKEND_URL is not defined! API calls might fall back to localhost for development."
  );
} else if (!BACKEND_URL && import.meta.env.PROD) {
  console.error(
    "VITE_APP_BACKEND_URL is not defined in production! Review functionality may fail."
  );
}

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk("/order/addReview", async (data) => {
  const response = await axios.post(`${BACKEND_URL}/api/shop/review/add`, data);

  return response.data;
});

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/shop/review/${id}`);

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
