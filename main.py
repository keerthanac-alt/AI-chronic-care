from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="AI Health Risk Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class VitalsData(BaseModel):
    heartRate: int
    bloodPressure: str
    spo2: int
    temperature: float
    glucose: int

@app.post("/predict-risk")
async def predict_risk(vitals: VitalsData):
    # Mock AI Logic
    score = 0
    recommendations = []
    
    if vitals.heartRate > 100 or vitals.heartRate < 60:
        score += 3
        recommendations.append("Abnormal heart rate detected. Rest immediately and consult a physician.")
        
    if vitals.spo2 < 95:
        score += 4
        recommendations.append("Low oxygen saturation. Practice deep breathing. Seek medical attention if it persists.")
        
    if vitals.glucose > 140:
        score += 2
        recommendations.append("Elevated glucose levels. Review your recent meals and medication.")
        
    status = "Normal"
    if score >= 5:
        status = "Critical"
    elif score >= 2:
        status = "Warning"
        
    return {
        "risk_score": score,
        "status": status,
        "recommendations": recommendations,
        "model_confidence": round(random.uniform(0.85, 0.99), 2)
    }

@app.get("/")
def read_root():
    return {"message": "AI Health Risk Service is Running"}
