import PlaceholderImage from "@/assets/images/background-image.png";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { ImageSource } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<undefined | string>(
    undefined
  );
  const [isVisible, setIsVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      1;
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setSelectedImage(undefined);
  };

  const onAddSticker = () => {
    setIsVisible(true);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={selectedImage ? { uri: selectedImage } : PlaceholderImage}
        />
      </View>
      {selectedImage ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" onPress={pickImageAsync}>
            Choose a photo
          </Button>
          <Button
            onPress={() =>
              setSelectedImage(
                Platform.OS === "web" ? PlaceholderImage.uri : PlaceholderImage
              )
            }
          >
            Use this photo
          </Button>
        </View>
      )}
      <EmojiPicker isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <EmojiList
          onCloseModal={() => setIsVisible(false)}
          onSelect={setPickedEmoji}
        />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
