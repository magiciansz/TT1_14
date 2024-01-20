from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client

from app.dependencies import get_supa_client

router = APIRouter()


@router.get("/")
async def read_destination(client: Client = Depends(get_supa_client)):
    res = client.table("destination").select("*").execute()
    return res


@router.put("/{id}")
async def edit_destination(
    id: int, cost: float, notes: str, client: Client = Depends(get_supa_client)
):
    res = (
        client.table("destination")
        .update({"cost": cost, "notes": notes})
        .eq("id", id)
        .execute()
    )
    print(res)
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
    res = client.table("destination").delete().eq("id", id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Destination Not Found")
    return Response(status_code=204)
