from app.routers.users import router as user_router
from app.routers.auth import router as auth_router
from app.routers.destination import router as destination_router

__all__ = [user_router, auth_router, destination_router]
