import joblib
import numpy as np
import pandas as pd
import os
from app.utils.preprocessing import transform_input

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "models_files") 

model_path = os.path.join(MODEL_DIR, "influencer_model.joblib")
if not os.path.exists(model_path):
    raise FileNotFoundError(f" File model tidak ditemukan: {model_path}")

model = joblib.load(model_path)
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.joblib"))
model_columns = joblib.load(os.path.join(MODEL_DIR, "model_columns.joblib"))

def predict_influencer(data: dict) -> dict:
    """
    Menerima input dict dari user, menerapkan aturan bisnis,
    melakukan preprocessing, dan mengembalikan hasil prediksi.
    """
    followers = data.get("Followers", 0)
    avg_likes = data.get("Avg. Likes", 0)
    posts = data.get("Posts", 0)
    # Aturan 1: Followers sangat sedikit tapi likes sangat banyak (tidak realistis)
    if followers <= 100 and avg_likes > (followers * 100):
        return {
            "prediction": 0,
            "probability_recommended": 0.0,
            "message": "Input tidak realistis: Jumlah likes tidak proporsional dengan followers yang sangat sedikit."
        }

    # Aturan 2: Jumlah posts sangat sedikit tapi likes sangat banyak
    if posts <= 10 and avg_likes > (posts * 500):
        return {
            "prediction": 0,
            "probability_recommended": 0.0,
            "message": "Input tidak realistis: Jumlah likes tidak proporsional dengan jumlah posts yang sangat sedikit."
        }
    
    if followers > 1000000 and avg_likes < (followers * 0.001):
         return {
            "prediction": 0,
            "probability_recommended": 0.05,
            "message": "Engagement rate sangat rendah, mengindikasikan kualitas audiens yang buruk."
        }
    try:
        processed_data = transform_input(data, model_columns, scaler)
    except Exception as e:
        print(f"Error saat preprocessing: {e}")
        return {
            "prediction": 0,
            "probability_recommended": 0.0,
            "message": f"Error saat memproses data input: {e}"
        }

    #Prediksi dari model
    try:
        prediction = model.predict(processed_data)[0]
        proba_all_classes = model.predict_proba(processed_data)[0]
        idx_recommended_class = list(model.classes_).index(1)
        probability_recommended = proba_all_classes[idx_recommended_class]

    except Exception as e:
        print(f"Error saat prediksi model: {e}")
        return {
            "prediction": 0,
            "probability_recommended": 0.0,
            "message": f"Error saat melakukan prediksi dengan model: {e}"
        }

    return {
        "prediction": int(prediction),
        "probability_recommended": round(float(probability_recommended), 4),
        "message": "Prediksi berhasil."
    }