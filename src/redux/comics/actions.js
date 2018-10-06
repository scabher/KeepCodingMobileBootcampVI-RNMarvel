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
    dispatch(setFetching(true));

    // Should call to API, here there is a simulation
    setTimeout(() => {
      console.log("addComic comics before: ", comics);
      const comics = getState().comics.list;
      comics.push(data);
      console.log("addComic comics after: ", comics);
      setList(comics);
      Actions.pop();
    }, 2000);

    dispatch(setFetching(false));
  };
}

export function postComic(data) {
  console.log("postComic data: ", data);
  return (dispatch, getState, api) => {
    const comic = getState().comics.item;
    if (!data || !comic) {
      return;
    }

    dispatch(setFetching(true));

    setTimeout(() => {
      const updateComicData = {
        ...data,
        id: comic.id
      };
      console.log("updateComicData: ", updateComicData);
      dispatch(setItem(updateComicData));
      Actions.pop();
    }, 2000);

    dispatch(setFetching(false));

    // Should call to api instead of dispatch setItem
    // api
    //  .postComic(updateComicData)...
  };
}

//#endregion
