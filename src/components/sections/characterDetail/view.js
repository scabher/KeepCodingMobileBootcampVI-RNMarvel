import React from "react";
import {
  View,
  Text,
  ListItem,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import styles from "./styles";
import { Button } from "../../widgets/";
import { Actions } from "react-native-router-flux";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageExpanded: true,
      animatedHeight: new Animated.Value(200)
    };
  }

  _onShowImage() {
    if (this.state.imageExpanded) {
      Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: 500
      }).start();
      this.setState({ imageExpanded: false });
    } else {
      Animated.timing(this.state.animatedHeight, {
        toValue: 200,
        duration: 500
      }).start();
      this.setState({ imageExpanded: true });
    }
  }

  render() {
    const { character } = this.props;
    const image =
      character && character.thumbnail
        ? {
            uri: character.thumbnail.path + "." + character.thumbnail.extension
          }
        : require("../../../resources/placeholder.jpg");
    const name = character && character.name ? character.name : "[Sin nombre]";
    const characterComics =
      character && character.comics && character.comics.items.length > 0
        ? character.comics.items
        : [];

    return (
      <View style={styles.container}>
        <Animated.Image
          source={image}
          resizeMode={"cover"}
          style={[styles.image, { height: this.state.animatedHeight }]}
        />
        <View style={styles.dataContainer}>
          <Text style={styles.text}>{"Nombre: "}</Text>
          <Text style={styles.text}>{name}</Text>
        </View>

        {/* <View style={styles.dataContainer}>
          characterComics.map((comic) => (
          <ListItem key={comic.id} title={comic.title} />
          ))
        </View> */}

        <View style={{ margin: 20 }}>
          <Button
            label={
              this.state.imageExpanded ? "OCULTAR IMAGEN" : "MOSTRAR IMAGEN"
            }
            onPress={() => this._onShowImage()}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Button
            label={"EDITAR"}
            onPress={() => Actions.characterAddEdit({ character, isEdit: true })}
          />
        </View>
      </View>
    );
  }
}
