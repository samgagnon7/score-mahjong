import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState("");

  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    let usePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.previewContainer}>
        <Image
          style={styles.photoPreview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Score Hand" onPress={usePhoto} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  photoPreview: {
    alignSelf: "stretch",
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
