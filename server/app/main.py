from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chatbot
from app.services import connect_to_mongo

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
db = connect_to_mongo()
app.include_router(chatbot.router, prefix="/api/v1/chatbot", tags=["chatbot"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Chatbot"}
