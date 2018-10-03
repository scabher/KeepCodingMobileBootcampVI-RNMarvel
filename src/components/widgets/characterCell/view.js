import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class extends Component {
  static defaultProps = {
    index: 0,
    character: null,
    onCharacterPress: () => {}
  };

  render() {
    const { character } = this.props;
    const image = character.thumbnail
      ? { uri: character.thumbnail.path + "." + character.thumbnail.extension }
      : require("../../../resources/placeholder.jpg");
    return (
      <TouchableOpacity
        onPress={() => this.props.onCharacterPress(character)}
        style={styles.cellContainer}
      >
        <Image
          source={image}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  }
}
