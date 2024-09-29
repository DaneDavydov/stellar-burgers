import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetOrder,
  orderBurgerIsLoadingSelector,
  orderBurgerSelector,
  sendOrderBurger
} from '../../services/slices/order-burger-slice';
import {
  resetConstructor,
  bunSelector,
  ingredientsSelector
} from '../../services/slices/constructor-slice';
import { userSelector } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedBun = useSelector(bunSelector);
  const selectedIngredients = useSelector(ingredientsSelector);
  const user = useSelector(userSelector);
  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedIngredients
  };

  const orderRequest = useSelector(orderBurgerIsLoadingSelector);
  const orderModalData = useSelector(orderBurgerSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item._id
    );

    dispatch(
      sendOrderBurger([
        ...ingredientsIds,
        constructorItems.bun._id,
        constructorItems.bun._id
      ])
    ).then(() => {
      dispatch(resetConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
