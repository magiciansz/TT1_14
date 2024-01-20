from fastapi import APIRouter, Depends
from supabase import Client
from pydantic import BaseModel

from app.dependencies import get_supa_client

class LoginBody(BaseModel):
    username: str
    password: str

router = APIRouter()


@router.post("/login")
async def login(body: LoginBody, client: Client = Depends(get_supa_client)):
    return body
    res = client.table("users").select("*").execute()
    return res

# @router.post('/register')
# async def register(client: Client = Depends(get_supa_client)):
    