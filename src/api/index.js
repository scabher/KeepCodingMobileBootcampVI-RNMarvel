import axios from "axios";

// DOCS:
// - https://developer.marvel.com/docs
// - https://developer.marvel.com/documentation/entity_types
const BASE_URL = "https://gateway.marvel.com/v1/public/";
const PUBLIC_API_KEY_PARAM = "apikey=bc03b351d93cd6da503ede3c5ac8d15f";

export function configureAxios() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Referer"] = "react-native.kc.com";
}

//#region Comic API calls
export function fetchComics() {
  const url = `/comics?${PUBLIC_API_KEY_PARAM}`;
  return axios.get(url);
}

export function fetchComicCharacters(comicId) {
  const url = `/comics/${comicId}/characters?${PUBLIC_API_KEY_PARAM}`;
  return axios.get(url);
}

/**
 * Fake method
 * The Marvel API does not allow post/update a comic data
 */
export function postComic(comic) {
  /* 
  const url = `/comic/${comic.id}?${PUBLIC_API_KEY_PARAM}`;
  return axios.post(url, comic);
  */
}
//#endregion

//#region Character API calls

/**
 * Fake method
 * The Marvel API does not allow post/update a character data
 */
export function postCharacter(character) {
  /* 
  const url = `/character/${character.id}?${PUBLIC_API_KEY_PARAM}`;
  return axios.post(url, character);
  */
}

//#endregion
