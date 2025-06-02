import React from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaInfoCircle } from 'react-icons/fa';

const ResultDisplay = ({ status, result, error }) => {
  // 1. Idle
  if (status === "idle") {
    return (
      <div className="flex items-center justify-center text-center p-4 bg-gray-50 rounded-lg text-gray-500">
        <FaInfoCircle className="mr-2" />
        <p>Hasil analisis akan ditampilkan di sini.</p>
      </div>
    );
  }

  // 2. Loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center text-center p-4 bg-blue-50 rounded-lg text-blue-600 animate-pulse">
        <FaSpinner className="animate-spin mr-2" />
        <p>Memproses prediksi...</p>
      </div>
    );
  }

  // 3. Error
  if (status === "error") {
    return (
      <div className="flex items-start text-left p-4 bg-red-50 rounded-lg text-red-700">
        <FaTimesCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20}/>
        <div>
          <h3 className="font-bold">Gagal Melakukan Prediksi</h3>
          {/* Tampilkan pesan error dari prop, bukan teks statis */}
          <p className="text-sm">{error || "Silakan periksa kembali input Anda dan coba lagi."}</p>
        </div>
      </div>
    );
  }

  // 4. Pengaman jika status success tapi tidak ada result
  if (status === "success" && !result) {
    return null;
  }

  // 5. Success
  if (status === "success") {
    const isRecommended = result.is_recommended; 
    const confidence = (result.recommendation_confidence * 100).toFixed(1);

    const baseClasses = "p-4 border-l-4 rounded-r-lg shadow-md";
    const recommendedClasses = "bg-green-50 border-green-500 text-green-800";
    const notRecommendedClasses = "bg-red-50 border-red-500 text-red-800";

    return (
      <div className={`${baseClasses} ${isRecommended ? recommendedClasses : notRecommendedClasses}`}>
        <div className="flex items-center">
          {isRecommended ? (
            <FaCheckCircle className="text-green-500 mr-3" size={24} />
          ) : (
            <FaTimesCircle className="text-red-500 mr-3" size={24} />
          )}
          <div>
            <p className="font-bold text-lg">
              {isRecommended ? "Direkomendasikan" : "Tidak Direkomendasikan"}
            </p>
            <p className="text-sm">
              Tingkat Kepercayaan: <strong>{confidence}%</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;