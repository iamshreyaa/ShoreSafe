import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../api';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const data = await loginUser(email, password);
            Alert.alert('Login Successful', `Welcome ${data.name}`);
            navigation.replace('MapScreen'); // Navigating to MapScreen after login
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Image
                style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover' }}
                source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
            />

            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <Text style={{ color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
                    Login
                </Text>

                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            padding: 15,
                            borderRadius: 10,
                            color: 'black',
                            marginBottom: 10,
                        }}
                        placeholder="Email"
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            padding: 15,
                            borderRadius: 10,
                            color: 'white',
                            marginBottom: 10,
                        }}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                  <TouchableOpacity
    onPress={handleLogin}
    style={{
        backgroundColor: '#97c9e2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 0.75, // Border width
        borderColor: 'black', // Border color
    }}
>
    <Text style={{ color: 'black', fontSize: 18 }}>Login</Text>
</TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'white' }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                            <Text style={{ color: '#000000' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}