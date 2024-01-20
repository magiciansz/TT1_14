from fastapi import APIRouter, Depends
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()


@router.get("/")
async def read_itinerary(client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").select("*").execute()
    return res


# @router.post("/itinerary/{id}")
# async def read_itinerary(client: Client = Depends(get_supa_client)):
#     res = client.table("users").select("*").execute()
#     return res

# @router.delete("/itinerary/{id}")
# async def read_itinerary(client: Client = Depends(get_supa_client)):
#     res = client.table("users").select("*").execute()
#     return res

# @router.put("/itinerary/{id}")
# async def read_itinerary(client: Client = Depends(get_supa_client)):
#     res = client.table("users").select("*").execute()
#     return res