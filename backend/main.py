from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user_router
from app.routers import auth_router

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix='/user')
app.include_router(user_router, prefix='/destination')
app.include_router(auth_router, prefix='/auth')
app.include_router(auth_router, prefix='/itinerary')

@app.get("/")
def root():
    return {"Hello World!"}
