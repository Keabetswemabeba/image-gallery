import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default function CameraScreen() {
  const [capturedImage, setCapturedImage] = useState([]);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false); 
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setCapturedImage([...capturedImage, uri]);
      console.log(uri);
    }
  };

  const goToGallery = () => {
    navigation.navigate('Gallery', { capturedImage });
  };

  const activateCamera = () => {
    setShowCamera(true);
  };

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <View style={styles.activateCameraContainer}>
          <Pressable onPress={activateCamera} style={styles.activateCameraButton}>
            <Text style={styles.activateCameraText}>Open Camera</Text>
          </Pressable>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          ref={(ref) => setCamera(ref)}
          type={Camera.Constants.Type.back}
        >
          <View style={styles.captureButtonContainer}>
            <Pressable
              onPress={goToGallery}
              style={styles.captureButton}>
              <FontAwesome name="image" size={24} color="#ccc" />
            </Pressable>
            <Pressable onPress={takePicture} style={styles.captureButton}>
              <FontAwesome name="camera" size={24} color="#ccc" />
            </Pressable>
            <Pressable style={styles.captureButton}>
              <FontAwesome name="refresh" size={24} color="#ccc" />
            </Pressable>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0',
  },
  activateCameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateCameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  activateCameraText: {
    color: '#ccc',
    fontSize: 18,
    fontWeight:'bold'
  },
  camera: {
    flex: 1,
  },
  captureButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
});
