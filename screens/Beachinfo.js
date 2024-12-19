import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BeachScreen = () => {
  const [loading, setLoading] = useState(false);
  const [beachData, setBeachData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBeachSuitability = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the Express API that communicates with Flask
      const response = await axios.get('http://127.0.0.1:5000/perform');
      
      // Store the result from the Flask API response
      setBeachData(response.data);

      console.log("Fetched Beach Data:", response.data); // For debugging
    } catch (err) {
      console.error('Error fetching beach suitability:', err);
      setError('Failed to fetch beach suitability data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeachSuitability(); // Call when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Fetch Beach Suitability" onPress={fetchBeachSuitability} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      {beachData && (
        <View style={styles.dataContainer}>
          <Text style={styles.title}>Beach Suitability Information</Text>
          <Text><strong>Calculated MCDA Score:</strong> {beachData.calculated_mcda_score}</Text>
          <Text><strong>Predicted MCDA Score:</strong> {beachData.predicted_mcda_score}</Text>
          <Text><strong>Suitability:</strong> {beachData.suitability}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});

export default BeachScreen;