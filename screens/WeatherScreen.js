import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function WeatherScreen() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async () => {
        if (!latitude || !longitude) {
            Alert.alert('Error', 'Please enter both latitude and longitude.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `https://customer-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,pressure_msl,wind_speed_80m,temperature_80m`
            );
            setWeatherData(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Enter Latitude:</Text>
            <TextInput
                placeholder="Latitude"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 }}
            />
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Enter Longitude:</Text>
            <TextInput
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 }}
            />
            <Button title="Fetch Weather Data" onPress={fetchWeatherData} />
            {loading && <Text style={{ marginTop: 20 }}>Loading...</Text>}
            {weatherData && (
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Weather Data:</Text>
                    <Text>Temperature (2m): {JSON.stringify(weatherData.hourly.temperature_2m)}</Text>
                    <Text>Precipitation Probability: {JSON.stringify(weatherData.hourly.precipitation_probability)}</Text>
                    <Text>Pressure (MSL): {JSON.stringify(weatherData.hourly.pressure_msl)}</Text>
                    <Text>Wind Speed (80m): {JSON.stringify(weatherData.hourly.wind_speed_80m)}</Text>
                    <Text>Temperature (80m): {JSON.stringify(weatherData.hourly.temperature_80m)}</Text>
                </View>
            )}
        </ScrollView>
    );
}