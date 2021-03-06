import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
  Animated
} from "react-native";
import styles from "./styles";
import { CharacterCell, Button } from "../../widgets/";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as ComicsActions from "../../../redux/comics/actions";
import * as CharactersActions from "../../../redux/characters/actions";

class ComicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageExpanded: true,
      animatedHeight: new Animated.Value(200)
    };
  }

  componentDidMount() {
    this.props.fetchComicCharactersList();
  }

  _renderActivityIndicator() {
    if (!this.props.isFetching) {
      return null;
    }
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} animating={true} />
      </View>
    );
  }

  _renderCharacter({ item }) {
    return (
      <CharacterCell
        character={item}
        onCharacterPress={this.props.onCharacterTapped}
      />
    );
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
    const { comic } = this.props;
    const image =
      comic && comic.images && comic.images.length > 0
        ? { uri: comic.images[0].path + "." + comic.images[0].extension }
        : require("../../../resources/placeholder.jpg");
    const title = comic && comic.title ? comic.title : "[Sin título]";
    const description =
      comic && comic.description ? comic.description : "[Sin descripción]";
    return (
      <ScrollView style={styles.container}>
        <Animated.Image
          source={image}
          resizeMode={"cover"}
          style={[styles.image, { height: this.state.animatedHeight }]}
        />

        <View style={styles.dataContainer}>
          <Text style={styles.text}>{"Título completo: "}</Text>
          <Text style={styles.text}>{title}</Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.text}>{"Descripción: "}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            label={
              this.state.imageExpanded ? "OCULTAR IMAGEN" : "MOSTRAR IMAGEN"
            }
            onPress={() => this._onShowImage()}
          />
        </View>

        <View style={styles.container}>
          <FlatList
            data={this.props.list}
            renderItem={value => this._renderCharacter(value)}
            keyExtractor={(item, i) => "cell" + item.id}
            extraData={this.props}
            numColumns={2}
            style={{ paddingTop: 40 }}
          />

          {this._renderActivityIndicator()}
        </View>

        <View style={{ margin: 20 }}>
          <Button
            label={"EDITAR"}
            onPress={() => Actions.comicAddEdit({ comic, isEdit: true })}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.comics.isFetching,
    list: state.characters.list,
    comic: state.comics.item
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchComicCharactersList: () => {
      dispatch(CharactersActions.fetchComicCharactersList(props.comic));
    },
    onCharacterTapped: character => {
      dispatch(CharactersActions.setItem(character));
      Actions.characterDetail({ title: character.name });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicDetail);
