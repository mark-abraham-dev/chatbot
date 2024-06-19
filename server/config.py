import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
