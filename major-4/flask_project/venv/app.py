from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd
import logging

app = Flask(__name__)

# Enable logging for debugging
logging.basicConfig(level=logging.INFO)

# Load the trained XGBoost model
try:
    model = joblib.load('xgboost_model_tuned.pkl')
    logging.info("Model loaded successfully.")
except FileNotFoundError:
    logging.error("Model file not found. Ensure 'xgboost_model_tuned.pkl' is in the correct directory.")
    raise

def calculate_weights(matrix):
    """
    Calculate weights dynamically using AHP Pairwise Comparison.
    :param matrix: Pairwise comparison matrix (2D list or np.array)
    :return: Normalized weights as a list
    """
    matrix = np.array(matrix)

    # Normalize the matrix by dividing each element by its column sum
    column_sums = matrix.sum(axis=0)
    normalized_matrix = matrix / column_sums

    # Calculate the weights by averaging across rows
    weights = normalized_matrix.mean(axis=1)
    return weights

@app.route('/perform', methods=['POST'])
def mcda_endpoint():
    try:
        parameters = request.json
        app.logger.info(f"Received parameters: {parameters}")

        # Validate the input parameters
        required_params = ["temperature", "humidity", "precipitation", "pressure", "wind_speed", "wind_direction"]
        
        # Check if all required parameters are present and are not None
        for param in required_params:
            if param not in parameters or parameters[param] is None:
                raise ValueError(f"Missing or invalid value for {param}")

        # Define the AHP pairwise comparison matrix
        pairwise_matrix = [
            [1, 3, 5, 7, 9, 6],
            [1/3, 1, 3, 5, 7, 5],
            [1/5, 1/3, 1, 3, 5, 4],
            [1/7, 1/5, 1/3, 1, 3, 2],
            [1/9, 1/7, 1/5, 1/3, 1, 1/2],
            [1/6, 1/5, 1/4, 1/2, 2, 1]
        ]
        weights = calculate_weights(pairwise_matrix)
        weights = weights / weights.sum()  # Normalize weights
        weight_dict = dict(zip(
            ["temperature", "humidity", "precipitation", "pressure", "wind_speed", "wind_direction"], weights
        ))

        # Normalize parameters before applying weights
        parameters['temperature'] = parameters['temperature'] / 40
        parameters['humidity'] = parameters['humidity'] / 100
        parameters['precipitation'] = 1 - parameters['precipitation']
        parameters['pressure'] = parameters['pressure'] / 1100
        parameters['wind_speed'] = 1 - (parameters['wind_speed'] / 100)
        parameters['wind_direction'] = parameters['wind_direction'] / 360

        # Calculate the MCDA score
        mcda_score = sum(parameters[key] * weight_dict[key] for key in parameters if key in weight_dict)

        # Normalize final MCDA score (to 100 scale)
        normalized_mcda_score = (mcda_score / sum(weights)) * 100

        # Prepare the model input (same features as in training)
        model_input = {
            "T2M_MAX": parameters["temperature"],
            "QV2M": parameters["humidity"],
            "PRECTOTCORR": parameters["precipitation"],
            "PS": parameters["pressure"],
            "WS10M_MAX": parameters["wind_speed"],
            "WD10M": parameters["wind_direction"]
        }

        # Convert to numpy array (no scaling)
        input_values = np.array(list(model_input.values())).reshape(1, -1)

        # Perform XGBoost prediction to predict the MCDA score
        predicted_mcda = model.predict(input_values)

        # Set the threshold for suitability (50 out of 100)
        suitability_threshold = 0.65

        # Determine if the beach is suitable to visit based on the predicted score
        if float(predicted_mcda[0]) >= suitability_threshold:
            suitability = "Suitable to visit"
        else:
            suitability = "Not suitable to visit"

        # Return the response with the MCDA score and predicted MCDA score
        return jsonify({
            "weights": weight_dict,
            "calculated_mcda_score": normalized_mcda_score,
            "predicted_mcda_score": float(predicted_mcda[0]),
            "suitability": suitability
        })

    except Exception as e:
        app.logger.error(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

