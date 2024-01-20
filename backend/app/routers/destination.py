from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client

from app.dependencies import get_supa_client
from app.models.destinationModel import DestinationUpdate
from app.models.destinationModel import DestinationInsert

router = APIRouter()


@router.get("/")
async def read_destination(client: Client = Depends(get_supa_client)):
    res = client.table("destination").select("*").execute()
    return res


@router.patch("/{id}")
async def edit_destination(
    id: int, dest: DestinationUpdate, client: Client = Depends(get_supa_client)
):
    res = (
        client.table("destination")
        .update({"cost": dest.cost, "notes": dest.notes})
        .eq("id", id)
        .execute()
    )
    print(res)
    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)


@router.put("/")
async def new_destination(country_id: int, cost:float, name:str, notes:str, 
                        dest: DestinationInsert,
                        client: Client = Depends(get_supa_client)):
    res = client.table('destination').insert({
        "country_id": country_id,
        "cost": cost,
        "name": name,
        "notes": notes
    }).execute()
    print(res)

    return res


@router.delete("/{id}")
async def delete_destination(id: int, client: Client = Depends(get_supa_client)):
    res = client.table("destination").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)
