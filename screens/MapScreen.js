import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // To get current location

const MapScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [region, setRegion] = useState({
    latitude: 20.5937, // Center of India
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  // Example data for beaches with coordinates
  const beaches = [
    { name: 'Goa', latitude: 15.2993, longitude: 74.124, description: 'Popular beach destination' },
    { name: 'Kochi', latitude: 9.9312, longitude: 76.2673, description: 'Scenic beach in Kerala' },
    { name: 'Puri', latitude: 19.8186, longitude: 85.8310, description: 'Famous for the Jagannath temple and beaches' }
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        Alert.alert("Permission Denied", "You need to allow location permissions to view your location.");
      }
    })();
  }, []);

  const handleSignOut = () => {
    navigation.navigate('Login'); // Navigate to the login screen on sign-out
  };

  const zoomIn = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 1.5,
      longitudeDelta: prevRegion.longitudeDelta / 1.5,
    }));
  };

  const zoomOut = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 1.5,
      longitudeDelta: prevRegion.longitudeDelta * 1.5,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={locationPermission} // Show current location
        followsUserLocation={true} // Optionally, auto-follow user's location
      >
        {/* Example marker for Delhi */}
        <Marker coordinate={{ latitude: 28.6139, longitude: 77.2090 }} title="Delhi" description="Capital of India" />

        {/* Dynamic Beach Markers */}
        {beaches.map((beach, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: beach.latitude, longitude: beach.longitude }}
            title={beach.name}
            description={beach.description}
          />
        ))}
      </MapView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Button to navigate to Beaches screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('BeachScreen')}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Go to Beaches</Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '70%', // Adjust map height as needed
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  zoomButton: {
    backgroundColor: '#97c9e2',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  zoomButtonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: '#97c9e2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10, // Adds space between the buttons
  },
  navButtonText: {
    color: 'black',
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#f44336', // Red color for SignOut button
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MapScreen;

