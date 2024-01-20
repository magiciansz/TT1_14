from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client
from pydantic import BaseModel
from app.models.authModel import LoginBody
from app.models.authModel import RegisterBody
from fastapi.encoders import jsonable_encoder
from flask_bcrypt import Bcrypt


from app.dependencies import get_supa_client
router = APIRouter()
bcrypt = Bcrypt()

@router.post("/login")
async def login(body: LoginBody, client: Client = Depends(get_supa_client)):
    user = client.table("users").select("*").eq('username', body.username).execute()
    # if 
    return ""

@router.post("/register")
async def register(body: RegisterBody, client: Client = Depends(get_supa_client)):
    first_name, last_name, username, password = body.first_name, body.last_name, body.username, body.password
    res = client.table("users").select("*").eq('username', username).execute()
    if res.data:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hash = bcrypt.generate_password_hash(password)
    newUser = RegisterBody(first_name= first_name, last_name= last_name, username= username, password= hash)
    client.table('users').insert(jsonable_encoder(newUser)).execute()
    return Response(status_code=201)


# @router.post('/register')
# async def register(client: Client = Depends(get_supa_client)):
    