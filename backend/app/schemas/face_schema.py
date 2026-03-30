from pydantic import BaseModel, EmailStr
from typing import List

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    faceDescriptor: List[float]

class FaceVerify(BaseModel):
    faceDescriptor: List[float]

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
