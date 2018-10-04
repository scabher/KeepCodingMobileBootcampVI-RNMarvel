import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Button, TextInput } from "../../widgets/";
import styles from "./styles";
import ImagePicker from "react-native-image-picker";

export default class extends Component {
  constructor(props) {
    super(props);
    console.log("props.comic.images.length: ", props.comic.images.length);
    const image =
      props.isEdit && props.comic.images && props.comic.images.length > 0
        ? {
            preview: {
              uri:
                props.comic.images[0].path +
                "." +
                props.comic.images[0].extension
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
        const comicId = this.props.comic.id;
        const imageData = this.state.image.data
          ? { image: this.setState.image.data }
          : {};
        const data = {
          ...imageData,
          title: title,
          description: description
        };
        // FUNCION PARA HACER PATCH
        //this.props.onSubmitCharacter(data)
      } else {
        const data = {
          image: image.data,
          title: title,
          description: description
        };
        this.props.onSubmitCharacter(data);
      }
    } else {
      Alert.alert("Atención", "Complete todos los campos");
    }
  }

  _onImagePickerTapped() {
    ImagePicker.showImagePicker(this.options, response => {
      if (response.uri && response.data) {
        let preview = { uri: response.uri };
        let data = "data:image/jpeg;base64," + response.data;
        this.setState({
          image: { preview, data }
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
    const imageUri = this.state.image ? this.state.image.preview : null;
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

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}
