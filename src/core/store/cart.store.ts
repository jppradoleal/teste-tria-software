import {createAction, props} from "@ngrx/store";
import Comic from "../models/comic.model";

export const add = createAction("Add to cart", props<{comic: Comic}>());

export const remove = createAction("Remove from cart", props<{comic: Comic}>());

export const clear = createAction("Clear cart");