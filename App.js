import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  // Función para abrir la cámara
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Función para seleccionar una imagen de la galería
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Función para compartir la imagen
  const shareImage = async () => {
    if (imageUri && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(imageUri);
    } else {
      Alert.alert('Error', 'No se puede compartir la imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Tomar o Importar Selfie</Text>

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={openGallery}>
        <Text style={styles.buttonText}>Seleccionar de Galería</Text>
      </TouchableOpacity>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={shareImage}>
            <Text style={styles.buttonText}>Compartir Imagen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  galleryButton: {
    backgroundColor: '#6f42c1',
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007bff',
  },
});
