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
