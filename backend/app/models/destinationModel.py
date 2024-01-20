from typing import Optional
from pydantic import BaseModel


class Destination(BaseModel):
    pass

class DestinationInsert(Destination):
    country_id: int
    cost: float
    name: int
    notes: Optional[str]

class DestinationUpdate(Destination):
    cost: Optional[float]
    notes: Optional[str]
