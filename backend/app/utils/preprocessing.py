import pandas as pd
import numpy as np


def transform_input(data: dict, model_columns: list, scaler) -> np.ndarray:
    """
    Fungsi preprocessing utama untuk:
    - Mengubah input dict ke DataFrame
    - One-hot encoding untuk fitur kategorikal
    - Menyesuaikan kolom dengan model
    - Scaling
    """
    df = pd.DataFrame([data])

    #One-hot encoding
    df_encoded = pd.get_dummies(df)

    #Tambahkan kolom yang hilang dari training
    for col in model_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0

    #Urutkan kolom agar cocok dengan urutan saat model training
    df_encoded = df_encoded.reindex(columns=model_columns)

    #Lakukan scaling hanya untuk fitur numerik
    df_scaled = scaler.transform(df_encoded)

    return df_scaled

