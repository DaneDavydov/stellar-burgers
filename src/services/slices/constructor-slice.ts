import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TInitialState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const constructorInitialState: TInitialState = {
  bun: null,
  ingredients: []
};

const moveIngredient = (
  state: TInitialState,
  action: PayloadAction<TConstructorIngredient>,
  direction: number
) => {
  const index = state.ingredients.findIndex(
    (item) => item.id === action.payload.id
  );
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < state.ingredients.length) {
    [state.ingredients[index], state.ingredients[newIndex]] = [
      state.ingredients[newIndex],
      state.ingredients[index]
    ];
  }
};

const constructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState: constructorInitialState,
  selectors: {
    bunSelector: (state) => state.bun,
    ingredientsSelector: (state) => state.ingredients
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp: (state, action) => moveIngredient(state, action, -1),
    moveIngredientDown: (state, action) => moveIngredient(state, action, 1)
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const { bunSelector, ingredientsSelector } = constructorSlice.selectors;
