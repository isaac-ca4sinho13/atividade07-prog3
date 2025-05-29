import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');


  const getWeather = async () => {
    try {
      const response = await axios.get(`http://172.22.80.1:3000/weather?city=${city}`);

      setWeather(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  if (!weather) {
    return <Text style={styles.errorText}>Erro ao carregar o clima.</Text>;
  }

  return (
    <View style={styles.container}>

      <View style={styles.cityInputContainer}>
  <TextInput
    style={styles.cityInput}
    value={city}
    onChangeText={setCity}
    placeholder="Digite a cidade"
    placeholderTextColor="#fff"
  />
  <Button title="Buscar" onPress={getWeather} />
      </View>


      <View style={styles.iconContainer}>
  {weather.condition_slug === 'rain' ? (
    <>
      <Icon name="cloud" size={60} color="#87CEEB" />
      <Icon name="umbrella" size={40} color="#00BFFF" style={styles.cloudIcon} />
    </>
  ) : weather.condition_slug === 'storm' ? (
    <Icon name="bolt" size={60} color="#FFD700" />
  ) : weather.condition_slug === 'cloud' ? (
    <Icon name="cloud" size={60} color="#ccc" />
  ) : (
    <Icon name="wb-sunny" size={60} color="#FFD700" />
  )}
</View>




      <Text style={styles.temp}>{weather.temp}°</Text>
      <Text style={styles.subText}>Max.: {weather.forecast[0].max}° Min.: {weather.forecast[0].min}°</Text>

      <View style={styles.details}>
        <Text>💧 {weather.rain} mm</Text>
        <Text>💦 {weather.humidity}%</Text>
        <Text>🌬 {weather.wind_speedy}</Text>
      </View>

      <Card containerStyle={styles.card}>
  <Text style={styles.sectionTitle}>
    Today - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
  </Text>
  <View style={styles.forecastRow}>
    {weather.forecast.slice(0, 4).map((f, index) => (
      <View key={index} style={styles.forecastItem}>
        <Text style={styles.forecastTemp}>{f.max}°C</Text>
        <Icon name="cloud" color="#4DB6E9" />
        <Text style={styles.forecastDate}>{f.date}</Text>
      </View>
    ))}
  </View>
</Card>


      <Card containerStyle={styles.card}>
  <Text style={styles.sectionTitle}>Next Forecast</Text>
  <View style={styles.nextForecastContainer}>
    {weather.forecast.slice(1, 3).map((day, index) => (
      <View key={index} style={styles.nextForecastItem}>
        <Text style={styles.nextForecastDay}>{day.weekday}</Text>
        <Text style={styles.nextForecastTemp}>
          {day.max}° | {day.min}°
        </Text>
      </View>
    ))}
  </View>
</Card>

    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4DB6E9',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 18,
    backgroundColor: '#4DB6E9',
  },
  container: {
    flex: 1,
    backgroundColor: '#4DB6E9',
    alignItems: 'center',
    paddingTop: 50,
  },
  city: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloudIcon: {
    marginLeft: -15,
  },
  temp: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 10,
  },
  card: {
    width: '90%',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  forecastRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 15,
},

forecastItem: {
  alignItems: 'center',
  padding: 8,
  backgroundColor: '#fff',
  borderRadius: 8,
  width: 70,
},

forecastTemp: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#4DB6E9',
},

forecastDate: {
  fontSize: 12,
  color: '#333',
},
nextForecastContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  gap: 10,
},

nextForecastItem: {
  alignItems: 'center',
  padding: 8,
  backgroundColor: '#fff',
  borderRadius: 8,
  width: 100,
},

nextForecastDay: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#4DB6E9',
},

nextForecastTemp: {
  fontSize: 14,
  color: '#333',
},
cityInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},

cityInput: {
  borderBottomWidth: 1,
  borderBottomColor: '#fff',
  color: '#fff',
  fontSize: 18,
  marginRight: 10,
  paddingVertical: 5,
  width: 150,
},


});
