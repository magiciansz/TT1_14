from fastapi import APIRouter, Depends
from supabase import Client

from app.dependencies import get_supa_client
import jwt
import os
router = APIRouter()
from ..dependencies.auth_bearer import JWTBearer

JWT_SECRET = os.getenv("AUTH_SECRET_KEY")
JWT_ALGORITHM = os.getenv("AUTH_ALGORITHM")


@router.get("/")
async def read_users(client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").execute()
    return res

@router.get("/test")
async def test_token(auth_token):
    decoded_token = jwt.decode(auth_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        # return decoded_token if decoded_token["expires"] >= time.time() else None
    return decoded_token 
