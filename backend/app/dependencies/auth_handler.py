
# import time
# from typing import Dict
# from fastapi import Depends

# import jwt
# import os
# from supabase import Client
# from app.dependencies import get_supa_client
# from fastapi.security import OAuth2PasswordBearer


# JWT_SECRET = os.getenv("AUTH_SECRET_KEY")
# JWT_ALGORITHM = os.getenv("AUTH_ALGORITHM")


# def token_response(token: str):
#     return {
#         "access_token": token
#     }


# def signJWT(user_id: str) -> Dict[str, str]:
#     payload = {
#         "user_id": user_id,
#         "expires": time.time() + 600
#     }
#     token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

#     return token_response(token)


# # def decodeJWT(token: str) -> dict:
# #     try:
# #         decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
# #         # user = client.table("users").select("*").eq("id", decoded_token["user_id"]).execute()
# #         # return decoded_token if user.data and decoded_token["expires"] >= time.time() else None
# #         return decoded_token if decoded_token["expires"] >= time.time() else None
# #     except:
# #         return {}


# def decodeJWT(token: str) -> dict:
#     try:
#         decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
#         return decoded_token if decoded_token["expires"] >= time.time() else None
#     except:
#         return {}
    

import time
from typing import Dict
import os

import jwt


JWT_SECRET = os.getenv("AUTH_SECRET_KEY")
JWT_ALGORITHM = os.getenv("AUTH_ALGORITHM")


def token_response(token: str):
    return {
        "access_token": token
    }


def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 600
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        # return decoded_token if decoded_token["expires"] >= time.time() else None
        return decoded_token 
    except:
        return {}