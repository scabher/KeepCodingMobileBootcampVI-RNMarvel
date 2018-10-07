import * as types from "./types";
import { AsyncStorage } from "react-native";

function setFetching(value) {
  return {
    type: types.CHARACTERS_SET_FETCHING,
    value: value
  };
}

export function setList(value) {
  return {
    type: types.CHARACTERS_UPDATE_LIST,
    value
  };
}

export function setItem(value) {
  return {
    type: types.CHARACTERS_SET_ITEM,
    value
  };
}

export function fetchComicCharactersList(comic) {
  return (dispatch, getState, api) => {
    if (!comic || !comic.id) {
      return;
    }

    AsyncStorage.getItem(`comicCharactersList-${comic.id}`, (error, result) => {
      if (result && !error) {
        const comicCharactersList = JSON.parse(result);
        dispatch(setList(comicCharactersList));
      } else {
        dispatch(setFetching(true));
      }
    });

    dispatch(setList([]));

    api
      .fetchComicCharacters(comic.id)
      .then(res => {
        dispatch(setFetching(false));
        dispatch(setList(res.data.data.results));
        AsyncStorage.setItem(
          `comicCharactersList-${comic.id}`,
          JSON.stringify(res.data.data.results)
        );
      })
      .catch(err => {
        dispatch(setFetching(false));
        console.log("fetchComicCharacters error: ", err);
      });
  };
}
