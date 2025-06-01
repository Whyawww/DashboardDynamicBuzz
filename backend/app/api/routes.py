# File: backend/app/api/routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.ml_service import predict_influencer

router = APIRouter()

#Skema data
class InfluencerInput(BaseModel):
    followers: float = Field(..., alias="Followers", example=500000)
    posts: float = Field(..., alias="Posts", example=1500)
    avg_likes: float = Field(..., alias="Avg. Likes", example=25000)
    category: str = Field(..., alias="Category", example="entertainment")
    channel_info: str = Field(..., alias="channel_Info", example="female")
    
    class Config:
        allow_population_by_field_name = True

@router.post("/predict", tags=["Prediction"])
async def handle_prediction(data: InfluencerInput):
    """
    Menerima data influencer dan mengembalikan prediksi rekomendasi 
    beserta skor kepercayaan (probabilitas).
    """
    try:
        #Ubah input Pydantic ke format dict
        input_data = data.dict(by_alias=True)
        result = predict_influencer(input_data)
        return {
            "is_recommended": bool(result["prediction"]),
            "recommendation_confidence": result["probability_recommended"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan pada server: {e}")