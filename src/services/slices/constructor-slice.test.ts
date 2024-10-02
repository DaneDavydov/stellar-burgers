import {
  addBun,
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  constructorReducer,
  constructorInitialState,
  resetConstructor
} from './constructor-slice';
import { describe, it, expect } from '@jest/globals';

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const ingredient = {
  id: 'TdDTSdu343C2xrXB5PAjh',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

describe('Test constructor slice', () => {
  it('add bun to constructor', () => {
    const newState = constructorReducer(constructorInitialState, addBun(bun));
    expect(newState).toEqual({ bun, ingredients: [] });
  });

  it('add ingredient to constructor', () => {
    const newState = constructorReducer(
      constructorInitialState,
      addIngredient(ingredient)
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [{ ...ingredient, id: newState.ingredients[0].id }]
    });
  });

  it('remove ingredient from constructor', () => {
    const newState = constructorReducer(
      constructorInitialState,
      removeIngredient(ingredient)
    );
    expect(newState).toEqual({ bun: null, ingredients: [] });
  });

  it('move up ingredient in constructor', () => {
    const initState = {
      bun: null,
      ingredients: [
        { ...ingredient, id: '1' },
        { ...ingredient, id: '2' }
      ]
    };

    const newState = constructorReducer(
      initState,
      moveIngredientUp({ ...ingredient, id: '2' })
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [
        { ...ingredient, id: '2' },
        { ...ingredient, id: '1' }
      ]
    });
  });

  it('move down ingredient in constructor', () => {
    const initState = {
      bun: null,
      ingredients: [
        { ...ingredient, id: '1' },
        { ...ingredient, id: '2' }
      ]
    };

    const newState = constructorReducer(
      initState,
      moveIngredientDown({ ...ingredient, id: '1' })
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [
        { ...ingredient, id: '2' },
        { ...ingredient, id: '1' }
      ]
    });
  });

  it('reset constructor', () => {
    const newState = constructorReducer(
      constructorInitialState,
      resetConstructor()
    );
    expect(newState).toEqual({ bun: null, ingredients: [] });
  });
});
