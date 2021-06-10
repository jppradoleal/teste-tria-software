import { Action, createReducer, on } from '@ngrx/store';
import { add, remove, clear, addDiscount } from '../store/cart.store';
import Comic from '../models/comic.model';
import CartStoreModel from '../models/cart-store.model';

export const initialState: CartStoreModel = {
  comics: [],
  total: 0,
  usedDiscount: false,
};

const _cartReducer = createReducer(
  initialState,
  on(add, (state, { comic }) => {
    const newComics = [...state.comics, comic];
    return {
      comics: newComics,
      total: newComics.map((v) => v.prices[0].price).reduce((t, v) => t + v),
      usedDiscount: state.usedDiscount,
    };
  }),
  on(remove, (state, { comic }) => {
    const newComics = state.comics.filter((v) => v !== comic);
    return {
      comics: newComics,
      total: newComics.map((v) => v.prices[0].price).reduce((t, v) => t + v),
      usedDiscount: state.usedDiscount,
    };
  }),
  on(addDiscount, (state, { discount }) => {
    return {
      comics: state.comics,
      total: state.usedDiscount ? state.total : state.total * 1 - 1 / discount,
      usedDiscount: true,
    };
  }),
  on(clear, (state) => initialState)
);

export function cartReducer(
  state: CartStoreModel = initialState,
  action: Action
) {
  return _cartReducer(state, action);
}
