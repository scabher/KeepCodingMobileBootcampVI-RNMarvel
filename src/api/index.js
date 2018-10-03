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

export function fetchComics() {
  const url = `/comics?${PUBLIC_API_KEY_PARAM}`;
  return axios.get(url);
}

export function fetchComicCharacters(comicId) {
  const url = `/comics/${comicId}/characters?${PUBLIC_API_KEY_PARAM}`;
  return axios.get(url);
}

export function postComicCharacter(data) {
  const url = "/personajes";
  return axios.post(url, data);
}
