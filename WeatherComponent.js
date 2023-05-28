import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherComponent = ({ weatherData }) => {
  const temperaturaCelsius = weatherData.main.temp - 273.15;

  return (
    <>
      <Icon  name="thermometer-half" size={50} color="black" />
      <Text>Nome da cidade: {weatherData.name}</Text>
      <Text>Temperatura: {temperaturaCelsius.toFixed(2)}°C</Text>
      <Text>Umidade: {weatherData.main.humidity}%</Text>
    </>
  );
};

export default WeatherComponent;
