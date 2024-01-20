from pydantic import BaseModel

class ItineraryBody(BaseModel):
    country: int
    user_id: int
    budget: float
    title: str