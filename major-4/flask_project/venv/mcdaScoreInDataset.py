# import numpy as np
# import pandas as pd
# from scipy.stats import zscore

# # Step 1: Define the pairwise comparison matrix in the given order
# pairwise_matrix = np.array([
#     [1, 3, 5, 7, 9, 6],     # Temperature
#     [1/3, 1, 3, 5, 7, 5],   # Humidity
#     [1/5, 1/3, 1, 3, 5, 4], # Precipitation
#     [1/7, 1/5, 1/3, 1, 3, 2], # Pressure
#     [1/9, 1/7, 1/5, 1/3, 1, 1/2], # Wind speed
#     [1/6, 1/5, 1/4, 1/2, 2, 1]  # Wind direction
# ])

# # Step 2: Normalize the pairwise matrix and compute AHP weights
# column_sums = pairwise_matrix.sum(axis=0)  # Column-wise sum
# normalized_matrix = pairwise_matrix / column_sums  # Normalize each column
# weights = normalized_matrix.mean(axis=1)  # Calculate row-wise mean for weights

# # Step 3: Load the dataset from CSV
# data = pd.read_csv("MajorData.csv")  # Replace with your actual file path

# # Map criteria to columns in the dataset
# criteria_columns = ["T2M_MAX", "QV2M", "PRECTOTCORR", "PS", "WS10M_MAX", "WD10M"]

# # Step 4: Normalize the criteria columns using Z-score standardization
# normalized_criteria = data[criteria_columns].apply(zscore)

# # Step 5: Calculate MCDA score for each row
# data['MCDA_Score'] = normalized_criteria.dot(weights)

# # Step 6: Normalize MCDA Score (optional, between 0 and 100)
# min_score = data['MCDA_Score'].min()
# max_score = data['MCDA_Score'].max()
# data['Normalized_MCDA_Score'] = (data['MCDA_Score'] - min_score) / (max_score - min_score) * 100

# # Step 7: Save and display the updated dataset
# data.to_csv("Updated_Dataset_with_MCDA.csv", index=False)
# print(data)

# # Display AHP-derived weights for reference
# print("\nAHP-Derived Weights for Criteria:")
# for criterion, weight in zip(criteria_columns, weights):
#     print(f"{criterion}: {weight:.4f}")


import pandas as pd
import numpy as np

# Step 1: Define the pairwise comparison matrix
pairwise_matrix = np.array([
    [1, 3, 5, 7, 9, 6],     # T2M_MAX (Temperature)
    [1/3, 1, 3, 5, 7, 5],   # QV2M (Humidity)
    [1/5, 1/3, 1, 3, 5, 4], # PRECTOTCORR (Precipitation)
    [1/7, 1/5, 1/3, 1, 3, 2], # PS (Pressure)
    [1/9, 1/7, 1/5, 1/3, 1, 1/2], # WS10M_MAX (Wind speed)
    [1/6, 1/5, 1/4, 1/2, 2, 1]  # WD10M (Wind direction)
])

# Step 2: Normalize the matrix
column_sums = pairwise_matrix.sum(axis=0)
normalized_matrix = pairwise_matrix / column_sums

# Step 3: Calculate the weights (priority vector)
weights = normalized_matrix.mean(axis=1)
weights /= weights.sum()  # Normalize weights to sum to 1

# Create a dictionary for parameter weights
parameters = ["T2M_MAX", "QV2M", "PRECTOTCORR", "PS", "WS10M_MAX", "WD10M"]
weight_dict = dict(zip(parameters, weights))

print("Weights:", weight_dict)

# Step 4: Load the dataset
file_path = "MajorData.csv"  # Update with the correct path if needed
data = pd.read_csv(file_path)

# Calculate scaling factors based on the dataset
scaling_factors = {
    "T2M_MAX": data["T2M_MAX"].max(),
    "QV2M": data["QV2M"].max(),
    "PRECTOTCORR": data["PRECTOTCORR"].max(),
    "PS": data["PS"].max(),
    "WS10M_MAX": data["WS10M_MAX"].max(),
    "WD10M": data["WD10M"].max()
}

# Normalization function using dynamic scaling factors
def normalize_parameters(row):
    normalized_values = {
        "T2M_MAX": row["T2M_MAX"] / scaling_factors["T2M_MAX"],
        "QV2M": row["QV2M"] / scaling_factors["QV2M"],
        "PRECTOTCORR": row["PRECTOTCORR"] / scaling_factors["PRECTOTCORR"],
        "PS": row["PS"] / scaling_factors["PS"],
        "WS10M_MAX": row["WS10M_MAX"] / scaling_factors["WS10M_MAX"],
        "WD10M": row["WD10M"] / scaling_factors["WD10M"]
    }
    return normalized_values

# Step 6: Calculate MCDA Score for each row
def calculate_mcda_score(row):
    normalized_values = normalize_parameters(row)
    score = sum(normalized_values[param] * weight_dict[param] for param in parameters)
    return score

data['MCDA_Score'] = data.apply(calculate_mcda_score, axis=1)

# Step 7: Save the updated dataset
output_file = "MajorData_with_MCDA.csv"
data.to_csv(output_file, index=False)
print(f"MCDA scores saved to {output_file}")
