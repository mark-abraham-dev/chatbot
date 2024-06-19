import openai
import os
from pymongo import MongoClient
import random

openai.api_key = os.getenv("OPENAI_API_KEY")

def connect_to_mongo():
    MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
    client = MongoClient(MONGO_URL)
    return client.chatbot_db

def get_answer_to_question(question: str) -> str:
    return random.choice(["Positive", "Neutral", "Negative"])
    # try:
    #     response = openai.Completion.create(
    #         engine="text-davinci-003",
    #         prompt=question,
    #         max_tokens=100
    #     )
    #     answer = response.choices[0].text.strip()
    #     return answer
    # except Exception as e:
    #     return str(e)
