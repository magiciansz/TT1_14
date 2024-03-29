import time
from typing import Dict
from dotenv import load_dotenv
import os

import jwt

load_dotenv()
JWT_SECRET = os.getenv("AUTH_SECRET_KEY")
JWT_ALGORITHM = os.getenv("AUTH_ALGORITHM")


def token_response(token: str, user_id: int):
    return {"access_token": token, "user_id": user_id}


def signJWT(user_id: str) -> Dict[str, str]:
    payload = {"user_id": user_id, "expires": time.time() + 600}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token, user_id)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        # return decoded_token if decoded_token["expires"] >= time.time() else None
        return decoded_token
    except:
        return {}
