from fastapi import APIRouter, HTTPException
from app.schemas import Question, Answer
from app.services import get_answer_to_question, connect_to_mongo
from app.models import Chat
from fastapi.encoders import jsonable_encoder

router = APIRouter()

db = connect_to_mongo()

@router.post("/ask", response_model=Answer)
def ask_question(question: Question):
    answer = get_answer_to_question(question.question)
    
    chat = Chat(question=question.question, answer=answer)
    chat_json = jsonable_encoder(chat)
    chat_json.pop("_id", None)
    db["chats"].insert_one(chat_json)
    
    return Answer(answer=answer)
