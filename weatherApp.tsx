import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getWeatherByCity } from './weatherApi'; // Make sure this file exists

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError('City not found or error fetching weather');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearch} />

      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.text}>City: {weather.name}</Text>
          <Text style={styles.text}>Temperature: {weather.main.temp}°C</Text>
          <Text style={styles.text}>Condition: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default WeatherApp;
