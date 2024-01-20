from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client
from app.models.itineraryModel import ItineraryBody
from fastapi.responses import JSONResponse


from app.dependencies import get_supa_client

router = APIRouter()


@router.get("/")   
async def getAll_itinerary(client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").select("*").execute()
    return res


@router.get("/{id}")
async def getbyid_itinerary(id: int, client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").select("*").eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")
    return res


@router.post("/")
async def update_itinerary(body: ItineraryBody, client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").insert({"country_id": body.country_id,
                                        "user_id":body.user_id,
                                        "budget": body.budget,
                                        "title": body.title}).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")
    return Response(status_code=204)


@router.delete("/{id}")
async def delete_itinerary(id: int, client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")
    return Response(status_code=204)


@router.put("/{id}")
async def update_itinerary(id: int, body : ItineraryBody, client: Client = Depends(get_supa_client)):
    res = client.table("itinerary").update({"country_id": body.country_id,
                                            "user_id":body.user_id,
                                            "budget": body.budget,
                                            "title": body.title}).eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")
    return Response(status_code=200)
