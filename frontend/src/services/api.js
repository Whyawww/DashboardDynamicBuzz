import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getPrediction = async (influencerData) => {
  try {
    const response = await apiClient.post('/predict', influencerData);
    return response.data;
  } catch (error) {
    console.error("API Call Failed:", error);
    let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
    if (error.response) {
      errorMessage = error.response.data?.detail || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "Tidak bisa terhubung ke server. Pastikan server backend sudah berjalan.";
    } else {
      errorMessage = `Error pada setup permintaan: ${error.message}`;
    }
    throw new Error(errorMessage)
  }
};
