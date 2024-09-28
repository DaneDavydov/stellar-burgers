import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed: () => initialState
  },
  selectors: {
    ordersFeedSelector: (state) => state.orders,
    totalFeedSelector: (state) => state.total,
    totalFeedTodaySelector: (state) => state.totalToday,
    isLoadingFeedSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const { resetFeed } = feedSlice.actions;
export const {
  ordersFeedSelector,
  totalFeedSelector,
  totalFeedTodaySelector,
  isLoadingFeedSelector
} = feedSlice.selectors;
