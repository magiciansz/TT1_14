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
    user_itinerary = client.table('itinerary').select("*").eq("user_id", id).execute()
    if not user_itinerary.data:
        return {}
    arrayOfItineraryIDs = []
    mappingOfItineraries = {}
    for itinerary in user_itinerary.data:
        arrayOfItineraryIDs.append(itinerary['id'])
        mappingOfItineraries[itinerary['id']] = {
            'title': itinerary['title'],
            'country_id': 1,
            'budget': itinerary['budget'],
            'destinations': []
        }
    destination_itineraries = client.table('itinerary_destination').select("destination_id", "itinerary_id").in_('itinerary_id', arrayOfItineraryIDs).execute()
    arrayOfDestinationIDs = []
    for destinationItinerary in destination_itineraries.data:
        arrayOfDestinationIDs.append(destinationItinerary['destination_id'])
    destinations = client.table('destination').select("*").in_('id', arrayOfDestinationIDs).execute()
    mappingOfDestinations = {}
    for destination in destinations.data:
        mappingOfDestinations[destination['id']] = destination

    for destinationItinerary in destination_itineraries.data:
        mappingOfItineraries[destinationItinerary['itinerary_id']]['destinations'].append(mappingOfDestinations[destinationItinerary['destination_id']])
    finalItineraries = []
    for k, v in mappingOfItineraries.items():
        finalItineraries.append(v)
    return finalItineraries


    #return Response(status_code=200)


