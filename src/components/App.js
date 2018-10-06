import React, { Component } from "react";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import { Router, Scene, Stack, Actions } from "react-native-router-flux";
import {
  Comics,
  Characters,
  CharacterDetail,
  ComicDetail,
  ComicAddEdit
} from "./sections/";
import * as api from "../api/";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as reducers from "../redux/";
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

const sceneDefaultStyles = {
  navigationBarStyle: { backgroundColor: "rgb(24,24,24)" },
  backButtonTintColor: "white",
  backButtonTextStyle: { color: "white" },
  titleStyle: { color: "white" }
};

const RightButton = props => (
  <TouchableOpacity
    style={{ padding: 10 }}
    onPress={() => Actions.comicAddEdit()}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>{"Añadir"}</Text>
  </TouchableOpacity>
);

export default class App extends Component {
  componentWillMount() {
    api.configureAxios();
    StatusBar.setBarStyle("light-content");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene
              key="comics"
              component={Comics}
              hideNavBar={true}
              initial={true}
            />
            <Scene
              key="comicDetail"
              component={ComicDetail}
              {...sceneDefaultStyles}
            />
            <Scene
              key="characters"
              component={Characters}
              renderRightButton={RightButton}
              {...sceneDefaultStyles}
            />
            <Scene
              key={"characterDetail"}
              component={CharacterDetail}
              {...sceneDefaultStyles}
            />
            <Scene
              key={"comicAddEdit"}
              component={ComicAddEdit}
              {...sceneDefaultStyles}
            />
          </Stack>
        </Router>
      </Provider>
    );
  }
}
