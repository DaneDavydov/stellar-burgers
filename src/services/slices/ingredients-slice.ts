import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

export const ingredientsInitialState: TInitialState = {
  ingredients: [],
  isLoading: false
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isLoadingSelector: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, isLoadingSelector } =
  ingredientsSlice.selectors;
