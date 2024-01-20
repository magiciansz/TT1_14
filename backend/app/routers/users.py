from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()

@router.get("/")
async def read_users(client: Client = Depends(get_supa_client)):
    res = client.table("users").select("*").execute()
    return res

@router.get("/{id}")
async def get_user_itinerary(id:int, client: Client = Depends(get_supa_client)):
    user_data = client.table("users").select("*").eq("id", id).execute()
    user_id = user_data.data[0]['id']
    user_itinerary = client.table('itinerary').select("*").eq("user_id", user_id).execute()

    return user_itinerary


    #return Response(status_code=200)


