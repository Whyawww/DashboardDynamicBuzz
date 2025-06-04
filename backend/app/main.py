import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

defined_origins = [
    "http://localhost:3000",
]

app = FastAPI(
    title="Dynamic Buzz KOL API",
    description="API Backend untuk prediksi influencer Key Opinion Leader (KOL) berdasarkan data analitik.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=defined_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
def health_check():
    print(">>> [main.py] Health check endpoint '/' diakses.")
    return {"status": "ok", "message": "Welcome to Dynamic Buzz API!"}

#Statement
print(">>> [main.py] Akan mendaftarkan router dari app.api.routes.")
app.include_router(router, prefix="/api")
print(">>> [main.py] Router dari app.api.routes telah didaftarkan dengan prefix /api.")

print("\n>>> [main.py] Rute yang terdaftar di aplikasi FastAPI:")
for route in app.routes:
    print(f"    Path: {route.path}, Name: {route.name}, Methods: {getattr(route, 'methods', '')}")
print(">>> [main.py] Selesai menampilkan rute.\n")

if __name__ == "__main__":
    import uvicorn
    print(">>> [main.py] Menjalankan Uvicorn server...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)