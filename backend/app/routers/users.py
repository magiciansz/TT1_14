from fastapi import APIRouter, Depends, HTTPException, Response
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

@router.get("/{id}")
async def get_user_itinerary(id:int, client: Client = Depends(get_supa_client)):
    user_data = client.table("users").select("*").eq("id", id).execute()
    if not user_data.data:
        raise HTTPException(status_code=404, detail="User Not Found")
    user_itinerary = client.table('itinerary').select("id").eq("user_id", id).execute()
    if not user_itinerary.data:
        return {}
    arrayOfItineraryIDs = []
    for itinerary in user_itinerary.data:
        arrayOfItineraryIDs.append(itinerary['id'])
    destination_itineraries = client.table('itinerary_destination').select("destination_id").in_('itinerary_id', arrayOfItineraryIDs).execute()
    arrayOfDestinationIDs = []
    for destination in destination_itineraries.data:
        arrayOfDestinationIDs.append(destination['destination_id'])
    destinations = client.table('destination').select("*").in_('id', arrayOfDestinationIDs).execute()
    return destinations


    #return Response(status_code=200)


