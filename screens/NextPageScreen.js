// screens/NextPageScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function NextPageScreen() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://customer-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,pressure_msl,wind_speed_80m,temperature_80m`
            );
            setWeatherData(response.data.hourly);
        } catch (error) {
            Alert.alert('Error fetching weather data', error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleFetchData = () => {
        if (!latitude || !longitude) {
            Alert.alert('Input Required', 'Please enter both latitude and longitude');
            return;
        }
        fetchWeatherData();
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Weather Forecast</Text>
            <Text>Latitude:</Text>
            <TextInput
                placeholder="Enter latitude"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 }}
            />
            <Text>Longitude:</Text>
            <TextInput
                placeholder="Enter longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 }}
            />
            <Button title="Get Weather Data" onPress={handleFetchData} />

            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
            {weatherData && (
                <FlatList
                    data={weatherData.time} // Assuming time is the hourly data
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: 10 }}>
                            <Text>Time: {item}</Text>
                            <Text>Temperature: {weatherData.temperature_2m[index]} °C</Text>
                            <Text>Precipitation Probability: {weatherData.precipitation_probability[index]} %</Text>
                            <Text>Pressure: {weatherData.pressure_msl[index]} hPa</Text>
                            <Text>Wind Speed: {weatherData.wind_speed_80m[index]} m/s</Text>
                            <Text>Temperature at 80m: {weatherData.temperature_80m[index]} °C</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}