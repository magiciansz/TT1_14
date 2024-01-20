from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client

from app.dependencies import get_supa_client
from app.models.destinationModel import DestinationUpdate

router = APIRouter()


@router.get("/")
async def read_destination(client: Client = Depends(get_supa_client)):
    res = client.table("destination").select("*").execute()
    return res


@router.patch("/{id}")
async def edit_destination(
    id: int, dest: DestinationUpdate, client: Client = Depends(get_supa_client)
):
    entry = client.table("destination").select("*").eq("id", id).execute()
    entry_data = entry.data[0]
    new_destination = {
        "cost": dest.cost if dest.cost else entry_data["cost"],
        "notes": dest.notes if dest.notes else entry_data["notes"],
    }

    res = client.table("destination").update(new_destination).eq("id", id).execute()

    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)


@router.post("/")
async def new_destination(country_id: int, cost:float, name:str, notes:str, 
                        client: Client = Depends(get_supa_client)):
    res = client.table('destination').insert({
        "country_id": country_id,
        "cost": cost,
        "name": name,
        "notes": notes
    })
    
    return 


@router.delete("/{id}")
async def delete_destination(id: int, client: Client = Depends(get_supa_client)):
    print(id, type(id))
    res = client.table("destination").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)
