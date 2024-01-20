from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()

@router.get("/")
async def read_users(client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").execute()
    return res

@router.get("/{id}")
async def get_user(id:int, client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").eq("id", id).execute()
    entry_data = res.data[0]
    #print(entry_data)

    if not res.data:
        raise HTTPException(status_code=404, detail="User Not Found")
    return Response(status_code=200)

