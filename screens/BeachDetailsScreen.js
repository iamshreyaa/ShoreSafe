// import React from 'react';
// import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

// const BeachDetailsScreen = ({ route }) => {
//   const { beachName, details } = route.params;

//   return (
//     <View style={styles.container}>
//       {/* Background Image */}
//       <Image
//         source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
//         style={styles.backgroundImage}
//       />

//       {/* Beach Details Section */}
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.header}>{beachName}</Text>

//         <View style={styles.detailsBox}>
//           <Text style={styles.detailText}>
//             <Text style={styles.label}>MCDA Score:</Text> {details.calculated_mcda_score}
//           </Text>
//           <Text style={styles.detailText}>
//             <Text style={styles.label}>XGBoost Score:</Text> {details.predicted_mcda_score}
//           </Text>
//           <Text style={styles.detailText}>
//             <Text style={styles.label}>Suitability:</Text> {details.suitability}
//           </Text>
//         </View>
//       </ScrollView>
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
//   contentContainer: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   detailsBox: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   detailText: {
//     fontSize: 18,
//     color: '#555',
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: 'bold',
//     color: '#222',
//   },
// });

// export default BeachDetailsScreen;

import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const BeachDetailsScreen = ({ route, navigation }) => {
  const { beachName, details } = route.params;

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('/Users/HP2/Desktop/my-app/assets/images/wave_background.png')}
        style={styles.backgroundImage}
      />

      {/* Beach Details Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>{beachName}</Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>MCDA Score:</Text> {details.calculated_mcda_score}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>XGBoost Score:</Text> {details.predicted_mcda_score}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Suitability:</Text> {details.suitability}
          </Text>
        </View>
      </ScrollView>
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
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#222',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#97c9e2',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BeachDetailsScreen;