import { orderBurgerApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  order: TOrder | null;
  ingredients: string[];
  isLoading: boolean;
};

const initialState: TInitialState = {
  order: null,
  ingredients: [],
  isLoading: false
};

export const sendOrderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    orderBurgerSelector: (state) => state.order,
    orderBurgerIngredientsSelector: (state) => state.ingredients,
    orderBurgerIsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderBurger.fulfilled, (state, { payload }) => {
        const { order } = payload;
        state.order = order;
        state.ingredients = order.ingredients;
        state.isLoading = false;
      })
      .addCase(sendOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendOrderBurger.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const orderBurgerReducer = orderBurgerSlice.reducer;
export const {
  orderBurgerSelector,
  orderBurgerIngredientsSelector,
  orderBurgerIsLoadingSelector
} = orderBurgerSlice.selectors;
export const { resetOrder } = orderBurgerSlice.actions;
