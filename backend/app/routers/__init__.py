from app.routers.users import router as user_router
from app.routers.auth import router as auth_router
from app.routers.destination import router as destination_router
from app.routers.itinerary import router as itinerary_router

__all__ = [user_router, auth_router, itinerary_router, destination_router]
