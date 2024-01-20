from pydantic import BaseModel

class ItineraryBody(BaseModel):
    country_id: int
    user_id: int
    budget: float
    title: str