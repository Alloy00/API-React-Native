import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, Modal, TouchableOpacity, Image } from 'react-native';
import { fetchWeather } from './api';
import WeatherComponent from './WeatherComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import climaimg from './assets/clima.png';


export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleInputChange = (text) => {
    setCity(text);
  };

  const handleSubmit = async () => {
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao obter os dados do clima:', error);
    }
  };

  const handleIconPress = () => {
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
        <Icon name="info-circle" size={40} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Climap</Text>

      <Image style={styles.climaimg} source={climaimg} />

      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={city}
        placeholder='Digite a cidade para pesquisar'
      />

      <Button
        title="Buscar Clima"
        onPress={() => {
          if (city) {
            handleSubmit();
          } else {
            // Exibir pop-up de erro
            console.log("Digite algo no input");
          }
        }}
      />

      {weatherData ? (
        <WeatherComponent weatherData={weatherData} />
      ) : (
        <Text style={styles.infoText}>Digite o nome da cidade e clique em Buscar Clima</Text>
      )}

      <Modal visible={isDialogVisible} transparent={true} animationType="fade">
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogtext}>Climap</Text>
          <Text style={styles.dialogtext}>App para consulta de clima de uma cidade, basta digitar o nome cidade na caixa de texto</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseDialog}>
            <Text style={styles.dialogtext}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
  },
  climaimg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dialogtext:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
  },
});
