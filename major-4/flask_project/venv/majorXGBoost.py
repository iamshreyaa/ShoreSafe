import xgboost as xgb
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, explained_variance_score, median_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib  # For saving the model

# Load your dataset
data = pd.read_csv("MajorData_with_MCDA.csv")

# Prepare the features and target
features = ["T2M_MAX", "QV2M", "PRECTOTCORR", "PS", "WS10M_MAX", "WD10M"]
X = data[features]
y = data["MCDA_Score"]  # Replace with your target column name

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the hyperparameters based on your tuning
params = {
    'learning_rate': 0.1,
    'max_depth': 4,
    'subsample': 0.8,
    'colsample_bytree': 0.9,
    'n_estimators': 200,
    'reg_lambda': 1,
    'reg_alpha': 0.1,
    'gamma': 0
}

# Initialize the XGBoost model with early stopping parameters
model = xgb.XGBRegressor(objective='reg:squarederror', eval_metric='rmse', early_stopping_rounds=50, **params)

# Define the validation set (to be used for early stopping)
eval_set = [(X_train, y_train), (X_test, y_test)]  # Use training and test set as eval_set

# Train the model with early stopping
model.fit(X_train, y_train, eval_set=eval_set, verbose=True)

# Predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
explained_variance = explained_variance_score(y_test, y_pred)
median_absolute_error_value = median_absolute_error(y_test, y_pred)
adjusted_r2 = 1 - (1 - r2) * (len(y_test) - 1) / (len(y_test) - X_test.shape[1] - 1)

# Print the metrics
print(f"Mean Squared Error (MSE): {mse}")
print(f"Root Mean Squared Error (RMSE): {rmse}")
print(f"Mean Absolute Error (MAE): {mae}")
print(f"R-squared (R²): {r2}")
print(f"Adjusted R-squared: {adjusted_r2}")
print(f"Explained Variance Score: {explained_variance}")
print(f"Median Absolute Error: {median_absolute_error_value}")


# Save the best model
joblib.dump(model, 'xgboost_model_tuned.pkl')
print("Tuned model saved as 'xgboost_model_tuned.pkl'.")

