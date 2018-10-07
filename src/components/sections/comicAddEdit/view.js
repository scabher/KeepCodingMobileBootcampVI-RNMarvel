import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Button, TextInput } from "../../widgets/";
import styles from "./styles";
import ImagePicker from "react-native-image-picker";

export default class extends Component {
  constructor(props) {
    super(props);
    const image =
      props.isEdit && props.comic.images && props.comic.images.length > 0
        ? {
            uri: {
              path: props.comic.images[0].path,
              extension: props.comic.images[0].extension
            }
          }
        : null;

    if (props.isEdit && props.comic) {
      this.state = {
        title: props.comic.title,
        description: props.comic.description,
        image: image
      };
    } else {
      this.state = {
        title: "",
        description: "",
        image: image
      };
    }

    this.options = {
      title: "Seleccionar imagen",
      maxWidth: 640,
      maxHeight: 640,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
  }

  componentWillMount() {
    const navbarTile =
      this.props.isEdit && this.props.comic ? "Editar comic" : "Añadir comic";
    this.props.navigation.setParams({ title: navbarTile });
  }

  _validateForm() {
    const { title, description, image } = this.state;
    if (title && description && image) {
      return true;
    } else {
      return false;
    }
  }

  _onSubmit() {
    if (this._validateForm()) {
      const { title, description, image } = this.state;
      if (this.props.isEdit) {
        const imageData = image.data
          ? {
              images: [
                {
                  path: image.uri.path,
                  extension: image.uri.extension
                }
              ],
              thumbnail: {
                path: image.uri.path,
                extension: image.uri.extension
              }
            }
          : {};
        const data = {
          ...imageData,
          title: title,
          description: description
        };
        this.props.onSubmitComic(data);
      } else {
        const data = {
          images: [
            {
              path: image.uri.path,
              extension: image.uri.extension
            }
          ],
          thumbnail: {
            path: image.uri.path,
            extension: image.uri.extension
          },
          title: title,
          description: description
        };
        this.props.onSubmitComic(data);
      }
    } else {
      Alert.alert("Atención", "Complete todos los campos");
    }
  }

  _onImagePickerTapped() {
    ImagePicker.showImagePicker(this.options, response => {
      if (response.uri && response.data) {
        const index = response.uri.lastIndexOf(".");
        const path = response.uri.slice(0, index);
        const extension = response.uri.slice(index + 1);
        let data = "data:image/jpeg;base64," + response.data;
        this.setState({
          image: { uri: { path, extension }, data }
        });
      }
    });
  }

  _renderTextInput(label, key, placeholder = "") {
    return (
      <TextInput
        label={label}
        value={this.state[key]}
        onChangeText={v => this.setState({ [key]: v })}
        placeholder={placeholder}
      />
    );
  }

  _renderImageInput() {
    const imageUri = this.state.image
      ? {
          uri: `${this.state.image.uri.path}.${this.state.image.uri.extension}`
        }
      : null;
    const imageLabel = this.state.image
      ? "Pulsa para escoger otra imagen"
      : "Pulsa para elegir imagen *";
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this._onImagePickerTapped()}
        >
          <Image source={imageUri} style={styles.image} resizeMode={"cover"} />
          <Text style={styles.imageText}>{imageLabel}</Text>
        </TouchableOpacity>
      </View>
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
      <ScrollView style={styles.container}>
        <View style={{ paddingTop: 40, padding: 20 }}>
          {this._renderTextInput(
            "Título del comic: *",
            "title",
            "Amazing Spider-Man"
          )}
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <TextInput
            label={"Descripción: *"}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
            placeholder={"Sin descripción"}
            multiline={true}
            numberOfLines={5}
          />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {this._renderImageInput()}
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Button
            label={"Guardar".toUpperCase()}
            onPress={() => this._onSubmit()}
            isFetching={this.props.isFetching}
          />
        </View>

        {this._renderActivityIndicator()}
      </ScrollView>
    );
  }
}
