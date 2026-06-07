from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "NariHealth GeoAI Backend is running"}

@app.get("/health")
def health():
    return {"status": "OK"}