from fastapi import APIRouter, Depends
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()


@router.get("/")
async def read_users(client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").execute()
    return res
