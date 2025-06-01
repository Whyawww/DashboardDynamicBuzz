import joblib
import numpy as np
import pandas as pd
import os
from app.utils.preprocessing import transform_input

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "models_files")

model_path = os.path.join(MODEL_DIR, "influencer_model.joblib")
scaler_path = os.path.join(MODEL_DIR, "scaler.joblib")
columns_path = os.path.join(MODEL_DIR, "model_columns.joblib")

if not os.path.exists(model_path):
    raise FileNotFoundError(f" File model tidak ditemukan: {model_path}")
if not os.path.exists(scaler_path):
    raise FileNotFoundError(f" File scaler tidak ditemukan: {scaler_path}")
if not os.path.exists(columns_path):
    raise FileNotFoundError(f" File model_columns tidak ditemukan: {columns_path}")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
model_columns = joblib.load(columns_path)

def preprocess_input(data: dict) -> np.ndarray:
    df = pd.DataFrame([data])
    df_encoded = pd.get_dummies(df)

    for col in model_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0

    df_encoded = df_encoded[model_columns]
    df_scaled = scaler.transform(df_encoded)

    return df_scaled

def predict_influencer(data: dict) -> dict:
    processed_data = preprocess_input(data)
    prediction = model.predict(processed_data)[0]
    proba = model.predict_proba(processed_data)[0][1]

    return {
        "prediction": int(prediction),
        "probability_recommended": round(float(proba), 4)
    }