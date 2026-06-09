import joblib
import numpy as np

model = joblib.load("backend/ml-models/pcos_model/model.pkl")

def predict_pcos(values):
    data = np.array(values).reshape(1, -1)

    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)[0]

    confidence = round(max(probability) * 100, 2)

    return {
        "prediction": "PCOS Detected" if prediction == 1 else "No PCOS",
        "confidence": confidence
    }