import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { ComicCell } from "../../widgets/";
import styles from "./styles";
import { connect } from "react-redux";
import * as ComicsActions from "../../../redux/comics/actions";

class Comics extends Component {
  componentDidMount() {
    this.props.fetchComicsList();
  }

  _onComicTapped(comic) {
    this.props.onComicTapped(comic);
  }

  _renderItem({ item }) {
    return (
      <ComicCell comic={item} onComicPress={v => this._onComicTapped(v)} />
    );
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

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.list}
          renderItem={value => this._renderItem(value)}
          keyExtractor={(item, i) => "cell" + item.id}
          extraData={this.props}
          numColumns={2}
          style={{ paddingTop: 40 }}
        />

        {this._renderActivityIndicator()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.comics.isFetching,
    list: state.comics.list
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchComicsList: () => {
      dispatch(ComicsActions.fetchComicsList());
    },
    onComicTapped: comic => {
      dispatch(ComicsActions.setItem(comic));
      Actions.comicDetail({ title: comic.title });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comics);
