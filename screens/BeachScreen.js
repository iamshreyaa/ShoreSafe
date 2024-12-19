// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Alert,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import * as Location from 'expo-location';
// import { useNavigation } from '@react-navigation/native';

// const beaches = [
//   { name: 'Baga Beach', latitude: 15.5528, longitude: 73.7432 },
//   { name: 'Anjuna Beach', latitude: 15.5519, longitude: 73.8000 },
//   { name: 'Candolim Beach', latitude: 15.5498, longitude: 73.8038 },
//   { name: 'Calangute Beach', latitude: 15.5521, longitude: 73.7494 },
//   { name: 'Vagator Beach', latitude: 15.5524, longitude: 73.7505 },
//   { name: 'Palolem Beach', latitude: 15.0000, longitude: 74.0860 },
//   { name: 'Colva Beach', latitude: 15.2511, longitude: 73.9983 },
//   { name: 'Morjim Beach', latitude: 15.6511, longitude: 73.7114 },
//   { name: 'Cola Beach', latitude: 15.0577, longitude: 73.9454 },
//   { name: 'Ashwem Beach', latitude: 15.5500, longitude: 73.7272 },
// ];

// const BeachScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [selectedBeach, setSelectedBeach] = useState(null); // To store selected beach details
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status === 'granted') {
//           const loc = await Location.getCurrentPositionAsync({});
//           setLocation(loc.coords);
//         } else {
//           Alert.alert(
//             'Permission Denied',
//             'Location permission is required to fetch your current location.'
//           );
//         }
//       } catch (error) {
//         console.error('Error fetching location:', error);
//       }
//     };
//     fetchLocation();
//   }, []);

//   const handleBeachClick = async (beach) => {
//     setLoading(true);
//     setError(null);
//     setSelectedBeach(null);

//     try {
//       // Send coordinates of the clicked beach to Node.js backend
//       const response = await axios.post('http://localhost:3001/fetch-data', {
//         latitude: beach.latitude,
//         longitude: beach.longitude,
//       });
      
//       setSelectedBeach(response.data); // Set fetched beach details
//     } catch (error) {
//       console.error('Error fetching beach details:', error);
//       setError('Unable to fetch beach details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.backgroundImage}
//         source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
//       />
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Beach Locations</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={beaches}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.listItem}
//             onPress={() => handleBeachClick(item)}
//           >
//             <Text style={styles.beachName}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.list}
//       />

//       {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      
//       {error && <Text style={styles.errorText}>{error}</Text>}
      
//       {selectedBeach && (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.detailsHeader}>Beach Details</Text>
//           <Text>MCDA Score: {selectedBeach.calculated_mcda_score}</Text>
//           <Text>XGBoost score: {selectedBeach.predicted_mcda_score}</Text>
//           <Text>Suitability: {selectedBeach.suitability}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     backgroundColor: '#f5f5f5',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     height: '100%',
//     width: '100%',
//     resizeMode: 'cover',
//   },
//   headerContainer: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   list: {
//     padding: 10,
//   },
//   listItem: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#97c9e2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   beachName: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   backButton: {
//     backgroundColor: '#97c9e2',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loading: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   detailsContainer: {
//     padding: 15,
//     marginTop: 20,
//     marginHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   detailsHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default BeachScreen;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const beaches = [
  { name: 'Baga Beach', latitude: 15.5528, longitude: 73.7432 },
  { name: 'Anjuna Beach', latitude: 15.5519, longitude: 73.8000 },
  { name: 'Candolim Beach', latitude: 15.5498, longitude: 73.8038 },
  { name: 'Calangute Beach', latitude: 15.5521, longitude: 73.7494 },
  { name: 'Vagator Beach', latitude: 15.5524, longitude: 73.7505 },
  { name: 'Palolem Beach', latitude: 15.0000, longitude: 74.0860 },
  { name: 'Colva Beach', latitude: 15.2511, longitude: 73.9983 },
  { name: 'Morjim Beach', latitude: 15.6511, longitude: 73.7114 },
  { name: 'Cola Beach', latitude: 15.0577, longitude: 73.9454 },
  { name: 'Ashwem Beach', latitude: 15.5500, longitude: 73.7272 },
];

const BeachScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation(loc.coords);
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to fetch your current location.'
          );
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, []);

  const handleBeachClick = async (beach) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/fetch-data', {
        latitude: beach.latitude,
        longitude: beach.longitude,
      });

      // Navigate to the details screen and pass the data
      navigation.navigate('BeachDetailsScreen', {
        beachName: beach.name,
        details: response.data,
      });
    } catch (error) {
      console.error('Error fetching beach details:', error);
      Alert.alert('Error', 'Unable to fetch beach details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        style={styles.backgroundImage}
        source={require('../assets/images/wave_background.png')} // Use relative path
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Beach Locations</Text>
      </View>

      {/* List of Beaches */}
      <FlatList
        data={beaches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleBeachClick(item)}
          >
            <Text style={styles.beachName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#97c9e2',
    padding: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70, // Adjusted to leave space for the back button
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  list: {
    padding: 10,
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#97c9e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beachName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
});

export default BeachScreen;