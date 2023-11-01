import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import GalleryItem from '../components/GalleryItem';

export default function GalleryScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.capturedImage) {
      const sampleImages = route.params?.capturedImage.map((imageUri, index) => ({
        id: index + 1,
        imagePath: imageUri,
        latitude: 123.45,
        longitude: 67.89,
      }));
      setImages(sampleImages);
    }
  }, [route.params?.capturedImage]);

  const handleImagePress = (item) => {
    navigation.navigate('ImageViewer', { imageDetails: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pictures</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <GalleryItem image={item} onPress={() => handleImagePress(item)} />
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 16, 
    textAlign: 'center', 
    color: '#ccc'
  },
  flatListContainer: {
    paddingHorizontal: 16, 
  },
});
