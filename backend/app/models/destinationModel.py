from typing import Optional
from pydantic import BaseModel


class Destination(BaseModel):
    pass


class DestinationUpdate(Destination):
    cost: Optional[float]
    notes: Optional[str]
