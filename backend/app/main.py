# File: backend/app/main.py

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

#Inisialisasi
app = FastAPI(
    title="Dynamic Buzz KOL API",
    description="API Backend untuk prediksi influencer Key Opinion Leader (KOL) berdasarkan data analitik.",
    version="1.0.0"
)

#Middleware untuk menangani Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Endpoint untuk health check
@app.get("/", tags=["Health Check"])
def health_check():
    """Endpoint untuk memverifikasi bahwa server berjalan dengan baik."""
    return {"status": "ok", "message": "API is up and running!"}

#Daftarkan router dari modul lain dengan prefix
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)