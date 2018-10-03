import * as ComicsActions from "./actions";
import reducer from "./reducer";
import { createStore } from "redux";

test("ComicsActions.setItem", () => {
  let store = createStore(reducer);
  let comic = { id: 1, title: "Gun Theory (2003) #4" };

  expect(store.getState().item).toEqual(null);

  store.dispatch(ComicsActions.setItem(comic));
  expect(store.getState().item).toEqual(comic);

  store.dispatch(ComicsActions.setItem(null));
  expect(store.getState().item).toEqual(null);
});
