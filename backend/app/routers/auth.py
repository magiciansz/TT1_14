from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from pydantic import BaseModel
from ..models.authModel import LoginBody
from ..models.authModel import RegisterBody
from fastapi.encoders import jsonable_encoder
from flask_bcrypt import Bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..dependencies.auth_handler import signJWT



from app.dependencies import get_supa_client
router = APIRouter()
bcrypt = Bcrypt()

@router.post("/login")
async def login(body: LoginBody, client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").eq('username', body.username).execute()
    # res = client.table("users").select("*").execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    if bcrypt.check_password_hash(res.data[0]['password'], body.password):
        return signJWT(res.data[0]['id'])
    else:
        raise HTTPException(status_code=401, detail="Password is not correct")
@router.post("/register")
async def register(body: RegisterBody, client: Client = Depends(get_supa_client)):
    first_name, last_name, username, password = body.first_name, body.last_name, body.username, body.password
    res = client.table("users").select("*").eq('username', username).execute()
    if res.data:
        raise HTTPException(status_code=400, detail="User already exists")
    hash = bcrypt.generate_password_hash(password)
    newUser = RegisterBody(first_name= first_name, last_name= last_name, username= username, password= hash)
    client.table('users').insert(jsonable_encoder(newUser)).execute()
    return {
        first_name: first_name,
        last_name: last_name,
        username: username,
    }


# @router.post('/register')
# async def register(client: Client = Depends(get_supa_client)):