import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  order: TOrder | null;
  isLoading: boolean;
};

export const orderInitialState: TInitialState = {
  order: null,
  isLoading: false
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {},
  selectors: {
    orderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { orderSelector } = orderSlice.selectors;
