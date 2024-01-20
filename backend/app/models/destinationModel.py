from typing import Optional
from pydantic import BaseModel


class Destination(BaseModel):
    pass

class DestinationInsert(Destination):
    country_id: int
    cost: float
    name: str
    notes: Optional[str] = None

class DestinationUpdate(Destination):
    cost: Optional[float] = None
    notes: Optional[str] = None
