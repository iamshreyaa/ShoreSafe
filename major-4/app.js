// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Fetch data from Open-Meteo API
// app.get('/fetch-data', async (req, res) => {
//     try {
//         // Extract latitude and longitude from query parameters
//         const { latitude, longitude } = req.query;

//         // Validate if latitude and longitude are provided
//         if (!latitude || !longitude) {
//             return res.status(400).json({ error: 'Latitude and longitude are required' });
//         }

//         // Define the URL for the Open-Meteo API request
//         const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m,wind_direction_10m&forecast_days=1`;

//         // Make the API request
//         const response = await axios.get(url);
//         console.log('Open-Meteo API Response:', response.data);

//         // Extract parameters for MCDA
//         const currentData = response.data.current; // Example key for current weather data
//         const parameters = {
//             temperature: currentData.temperature_2m || null,
//             humidity: currentData.relative_humidity_2m || null,
//             precipitation: currentData.precipitation || null,
//             pressure: currentData.surface_pressure || null,
//             wind_speed: currentData.wind_speed_10m || null,
//             wind_direction: currentData.wind_direction_10m || null,
//         };

//         console.log('Sending parameters to Flask:', parameters);

//         // Send the extracted data to the Flask backend
//         const flaskResponse = await axios.post('http://127.0.0.1:5000/perform', parameters);

//         // Respond with the processed result from Flask
//         res.status(200).json(flaskResponse.data);
//     } catch (error) {
//         console.error('Error occurred:', error.message);
//         res.status(500).json({ error: 'An error occurred while fetching or processing data' });
//     }
// });

// // Start the server
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Fetch data from Open-Meteo API
app.post('/fetch-data', async (req, res) => {
    try {
        // Extract latitude and longitude from the request body
        const { latitude, longitude } = req.body;

        // Validate if latitude and longitude are provided
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        // Define the URL for the Open-Meteo API request
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m,wind_direction_10m&forecast_days=1`;

        // Make the API request
        const response = await axios.get(url);
        console.log('Open-Meteo API Response:', response.data);

        // Extract parameters for MCDA
        const currentData = response.data.current; // Example key for current weather data
        const parameters = {
             temperature: currentData.temperature_2m,
             humidity: currentData.relative_humidity_2m,
             precipitation: currentData.precipitation,
             pressure: currentData.surface_pressure,
             wind_speed: currentData.wind_speed_10m,
             wind_direction: currentData.wind_direction_10m,
         };

        console.log('Sending parameters to Flask:', parameters);

        // Send the extracted data to the Flask backend
        const flaskResponse = await axios.post('http://127.0.0.1:5000/perform', parameters);

        // Respond with the processed result from Flask
        res.status(200).json(flaskResponse.data);
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});