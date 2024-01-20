from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from pydantic import BaseModel
from ..models.authModel import LoginBody
from ..models.authModel import RegisterBody
from fastapi.encoders import jsonable_encoder


from app.dependencies import get_supa_client
router = APIRouter()

@router.post("/login")
async def login(body: LoginBody, client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").execute()
    return res

@router.post("/register")
async def register(body: RegisterBody, client: Client = Depends(get_supa_client)):
    first_name, last_name, username, password = body.first_name, body.last_name, body.username, body.password
    res = client.table("users").select("*").eq('username', username).execute()
    if res.data:
        raise HTTPException(status_code=400, detail="User already exists")
    newUser = RegisterBody(first_name= first_name, last_name= last_name, username= username, password= password)
    client.table('users').insert(jsonable_encoder(newUser)).execute()
    return res


# @router.post('/register')
# async def register(client: Client = Depends(get_supa_client)):
    