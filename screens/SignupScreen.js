import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../api';

export default function SignupScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            await registerUser(name, email, password);
            Alert.alert('Registration Successful', 'You can now log in');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Registration Failed', error.message || 'An error occurred');
        }
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <StatusBar style="light" />
            <Image
                source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
                style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover' }}
            />
            <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 56, paddingBottom: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}
                    >
                        Sign Up
                    </Text>
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 16, space: 16 }}>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 15, borderRadius: 16, width: '100%' }}>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={'white'}
                            style={{ color: 'white' }}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 15, borderRadius: 16, width: '100%' }}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'white'}
                            style={{ color: 'white' }}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 15, borderRadius: 16, width: '100%', marginBottom: 12 }}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            style={{ color: 'white' }}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity 
                            onPress={handleSignup}
                            style={{ backgroundColor: '#97c9e2', padding: 15, borderRadius: 16, marginBottom: 12 }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', textAlign: 'center' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text style={{ color: '#97c9e2' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}