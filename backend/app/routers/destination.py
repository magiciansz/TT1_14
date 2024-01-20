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


@router.delete("/{id}")
async def delete_destination(id: int, client: Client = Depends(get_supa_client)):
    print(id, type(id))
    res = client.table("destination").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)
