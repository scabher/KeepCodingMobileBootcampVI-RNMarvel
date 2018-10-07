import * as types from "./types";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

function setFetching(value) {
  return {
    type: types.COMICS_SET_FETCHING,
    value: value
  };
}

export function setList(value) {
  return {
    type: types.COMICS_UPDATE_LIST,
    value
  };
}

export function setItem(value) {
  return {
    type: types.COMICS_SET_ITEM,
    value
  };
}

//#region Api calls

export function fetchComicsList() {
  return (dispatch, getState, api) => {
    AsyncStorage.getItem("comicsList", (error, result) => {
      if (result && !error) {
        const comicsList = JSON.parse(result);
        dispatch(setList(comicsList));
      } else {
        dispatch(setFetching(true));
      }
    });

    api
      .fetchComics()
      .then(res => {
        dispatch(setFetching(false));
        dispatch(setList(res.data.data.results));
        AsyncStorage.setItem(
          "comicsList",
          JSON.stringify(res.data.data.results)
        );
      })
      .catch(err => {
        dispatch(setFetching(false));
        console.log("fetchComicsList error: ", err);
      });
  };
}

export function addComic(data) {
  return (dispatch, getState, api) => {
    if (!data) {
      return;
    }

    dispatch(setFetching(true));

    // Should call to API, here there is a simulation
    setTimeout(() => {
      const comics = getState().comics.list;
      comics.push(data);
      dispatch(setList(comics));
      Actions.pop();
    }, 2000);

    dispatch(setFetching(false));
  };
}

export function postComic(data) {
  return (dispatch, getState, api) => {
    const comic = getState().comics.item;
    if (!data || !comic) {
      return;
    }

    dispatch(setFetching(true));

    setTimeout(() => {
      const comicList = getState().comics.list;
      comicList.map((item, idx, comics) => {
        if (item.id == comic.id) {
          comics[idx] = {
            ...item,
            ...data,
            id: comic.id
          };
          dispatch(setItem(comics[idx]));
          dispatch(setList(comicList));
        }
      });
      Actions.pop();
    }, 2000);

    dispatch(setFetching(false));

    // Should call to api instead of dispatch setItem and setList
    // api
    //  .postComic(updateComicData)...
  };
}

//#endregion
