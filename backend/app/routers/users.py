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
    user_itinerary = client.table('itinerary').select("*").eq("user_id", id).execute()

    #client.table('itinerary_destination').select("*")
    all_itinerary_id = []
    for i in user_itinerary.data:
        all_itinerary_id.append(i['id'])

    all_destination_id = []
    for i in all_itinerary_id:
        all_destination_id.append(client.table('itinerary_destination').select('destination_id').eq("itinerary_id", i).execute())
    
    for dest in all_destination_id:
        for d in dest.data:
            print(d)

    #client.table('itinerary')
    test = client.table('itinerary').select('id, itinerary_destination (itinerary_id, destination_id)').execute()
    print(test)

    return all_destination_id


    #return Response(status_code=200)


