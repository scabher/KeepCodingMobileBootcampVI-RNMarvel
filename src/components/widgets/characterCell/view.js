import React, { Component } from "react";
import { Image, TouchableOpacity, Animated, Easing } from "react-native";
import styles from "./styles";

export default class extends Component {
  static defaultProps = {
    index: 0,
    character: null,
    onCharacterPress: () => {}
  };

  render() {
    const { character, onCharacterPress } = this.props;
    const image = character.thumbnail
      ? { uri: character.thumbnail.path + "." + character.thumbnail.extension }
      : require("../../../resources/placeholder.jpg");

    this.state = { spinValue: new Animated.Value(0) };

    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <TouchableOpacity
        onPress={() => onCharacterPress(character)}
        style={styles.cellContainer}
      >
        <Animated.Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            transform: [{ rotate: spin }]
          }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  }
}
