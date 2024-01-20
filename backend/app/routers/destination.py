from fastapi import APIRouter, Depends
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()

@router.get("/")
async def read_destination(client: Client = Depends(get_supa_client)):
    res = client.table("destination").select("*").execute()
    return res
