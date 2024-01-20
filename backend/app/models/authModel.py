from pydantic import BaseModel

class LoginBody(BaseModel):
    username: str
    password: str

class RegisterBody(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str