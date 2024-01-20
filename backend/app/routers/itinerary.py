from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client
from app.models.itineraryModel import ItineraryBody


from app.dependencies import get_supa_client

router = APIRouter()


@router.get("/")   
async def getAll_itinerary(client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").select("*").execute()
    return res

# @router.get("/{id}")
# async def getbyid_itinerary(id: int, client: Client = Depends(get_supa_client)):
#     # if id not in itinerary:
#     #     raise HTTPException(status_code=404, detail="Item not found")
#     return {"name": fake_items_db[item_id]["name"], "item_id": item_id}

# @router.post("/")
# async def update_itinerary(body: Itinerary_Body, client: Client = Depends(get_supa_client)):


    # newItinerary =ItineraryBody(country= country, )
    # return body


    # first_name, last_name, username, password = body.first_name, body.last_name, body.username, body.password
    # res = client.table("users").select("*").eq('username', username).execute()
    # if res.data:
    #     raise HTTPException(status_code=400, detail="User already exists")
    
    # hash = bcrypt.generate_password_hash(password)
    # newUser = RegisterBody(first_name= first_name, last_name= last_name, username= username, password= hash)
    # client.table('users').insert(jsonable_encoder(newUser)).execute()
    # return Response(status_code=201)


@router.delete("/{id}")
async def delete_itinerary(id: int, client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")
    return Response(status_code=204)

# @router.put("/")
# async def update_itinerary(client: Client = Depends(get_supa_client)):
#     res = client.table("itinerary").select("*").execute()
#     return res