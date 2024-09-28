import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './slices/user-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { feedReducer } from './slices/feed-slice';
import { orderBurgerReducer } from './slices/order-burger-slice';
import { userOrdersReducer } from './slices/user-orders-slice';
import { orderReducer } from './slices/order-slice';
import { constructorReducer } from './slices/constructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  orderBurger: orderBurgerReducer,
  order: orderReducer,
  userOrder: userOrdersReducer,
  ingredientsConstructor: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
