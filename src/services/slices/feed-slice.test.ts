import {
  getFeeds,
  feedReducer,
  feedInitialState,
  resetFeed
} from './feed-slice';
import { describe, it, expect } from '@jest/globals';

const payload = {
  orders: [
    {
      _id: '66fd6a7507cc0b001c1d55a5',
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space астероидный фалленианский краторный био-марсианский бургер',
      createdAt: '2024-10-02T15:44:53.286Z',
      updatedAt: '2024-10-02T15:44:54.119Z',
      number: 54849
    },
    {
      _id: '66fd62b007cc0b001c1d5591',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-02T15:11:44.507Z',
      updatedAt: '2024-10-02T15:11:45.442Z',
      number: 54848
    }
  ],
  total: 2,
  totalToday: 2,
  isLoading: false
};

describe('Test feed slice', () => {
  it('get feeds', () => {
    const newState = feedReducer(feedInitialState, {
      type: getFeeds.fulfilled.type,
      payload
    });
    expect(newState).toEqual(payload);
  });

  it('reset feed', () => {
    const newState = feedReducer(feedInitialState, {
      type: resetFeed.type
    });
    expect(newState).toEqual(feedInitialState);
  });
});
