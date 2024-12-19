import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <StatusBar style="light" />
            {/* Background Image */}
            <Image
                source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
                style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover' }}
            />

            {/* Title */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 40, // Default font size
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: 20,
                    }}
                >
                    Welcome
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        backgroundColor: '#97c9e2',
                        padding: 15,
                        borderRadius: 25,
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}