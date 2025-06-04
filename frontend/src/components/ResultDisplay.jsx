import React from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa'; // Tambahkan FaExclamationTriangle

const ResultDisplay = ({ status, result, error }) => {
  // 1. Idle
  if (status === "idle") {
    return (
      <div className="flex items-center justify-center text-center p-4 bg-gray-50 rounded-lg text-gray-500 shadow">
        <FaInfoCircle className="mr-2 flex-shrink-0" />
        <p>Hasil analisis akan ditampilkan di sini.</p>
      </div>
    );
  }

  // 2. Loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center text-center p-4 bg-blue-50 rounded-lg text-blue-600 animate-pulse shadow">
        <FaSpinner className="animate-spin mr-2 flex-shrink-0" />
        <p>Memproses prediksi...</p>
      </div>
    );
  }

  // 3. Error
  if (status === "error") {
    return (
      <div className="flex items-start text-left p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-800 shadow-md">
        <FaTimesCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20}/>
        <div>
          <h3 className="font-bold">Gagal Melakukan Prediksi</h3>
          <p className="text-sm">{error || "Silakan periksa kembali input Anda dan coba lagi."}</p>
        </div>
      </div>
    );
  }

  // 4. Pengaman jika status success tapi tidak ada result
  if (status === "success" && !result) {
    return (
        <div className="flex items-start text-left p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg text-yellow-800 shadow-md">
            <FaExclamationTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={20}/>
            <div>
                <h3 className="font-bold">Hasil Tidak Valid</h3>
                <p className="text-sm">Data hasil tidak diterima dengan benar dari server.</p>
            </div>
        </div>
    );
  }

  // 5. Success
  if (status === "success") {
    const isRecommended = result.is_recommended; 
    const confidence = (result.recommendation_confidence * 100).toFixed(1);
    const messageFromServer = result.message;

    const baseClasses = "p-4 border-l-4 rounded-r-lg shadow-md";
    const recommendedClasses = "bg-green-50 border-green-500 text-green-800";
    const notRecommendedClasses = "bg-red-50 border-red-500 text-red-800";
    const warningClasses = "bg-yellow-50 border-yellow-500 text-yellow-800";

    let finalClasses = isRecommended ? recommendedClasses : notRecommendedClasses;
    if (messageFromServer && messageFromServer.toLowerCase().includes("tidak realistis") && !isRecommended) {
        finalClasses = warningClasses;
    }


    return (
      <div className={`${baseClasses} ${finalClasses}`}>
        <div className="flex items-start"> 
          {isRecommended ? (
            <FaCheckCircle className={`${messageFromServer && messageFromServer.toLowerCase().includes("tidak realistis") ? "text-yellow-500" : "text-green-500"} mr-3 mt-1 flex-shrink-0`} size={20} />
          ) : (
            <FaTimesCircle className={`${messageFromServer && messageFromServer.toLowerCase().includes("tidak realistis") ? "text-yellow-500" : "text-red-500"} mr-3 mt-1 flex-shrink-0`} size={20} />
          )}
          <div>
            <p className="font-bold text-lg">
              {isRecommended ? "Direkomendasikan" : "Tidak Direkomendasikan"}
            </p>
            <p className="text-sm">
              Tingkat Kepercayaan: <strong>{confidence}%</strong>
            </p>
            {/* Tampilkan pesan dari server */}
            {messageFromServer && (
              <p className="text-xs mt-2 italic">{messageFromServer}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;