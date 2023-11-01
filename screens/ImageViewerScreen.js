import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

export default function ImageViewerScreen({ route }) {
  const { imageDetails } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageDetails.imagePath }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.text}> Latitude: {imageDetails.latitude}</Text>
        <Text style={styles.text}> Longitude: {imageDetails.longitude}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    color: '#ccc',
  },
});
