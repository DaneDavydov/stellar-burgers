import {
  getOrderByNumber,
  orderReducer,
  orderInitialState
} from './order-slice';
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

describe('Test order slice', () => {
  it('test get order by number', () => {
    const state = orderReducer(orderInitialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders }
    });
    expect(state).toEqual({ ...orderInitialState, order: orders[0] });
  });

  it('test get order by number rejected', () => {
    const state = orderReducer(orderInitialState, {
      type: getOrderByNumber.rejected.type
    });
    expect(state).toEqual({ ...orderInitialState, isLoading: false });
  });

  it('test get order by number pending', () => {
    const state = orderReducer(orderInitialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state).toEqual({ ...orderInitialState, isLoading: true });
  });
});
