import { Action, createReducer, on } from '@ngrx/store';
import { add, remove, clear } from '../store/cart.store';
import Comic from '../models/comic.model';

export const initialState: Comic[] = [];

const _cartReducer = createReducer(
  initialState,
  on(add, (state, { comic }) => [...state, comic]),
  on(remove, (state, { comic }) => state.filter(v => v !== comic)),
  on(clear, state => [])
);

export function cartReducer(state: Comic[] = initialState, action: Action) {
  return _cartReducer(state, action);
}
