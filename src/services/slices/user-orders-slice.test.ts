import {
  getUserOrders,
  userOrdersReducer,
  userOrderInitialState
} from './user-orders-slice';
import { describe, it, expect } from '@jest/globals';

const orders = [
  {
    _id: '66fd6a7507cc0b001c1d55a5',
    ingredients: [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Space астероидный фалленианский краторный био-марсианский бургер',
    createdAt: '2024-10-02T15:44:53.286Z',
    updatedAt: '2024-10-02T15:44:54.119Z',
    number: 54849
  }
];

describe('Test user-orders slice', () => {
  it('test get user orders', () => {
    const state = userOrdersReducer(userOrderInitialState, {
      type: getUserOrders.fulfilled.type,
      payload: orders
    });
    expect(state).toEqual({ ...userOrderInitialState, orders });
  });
});
