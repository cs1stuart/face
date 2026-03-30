from fastapi import APIRouter, HTTPException
from ...services import face_service
from ...schemas.face_schema import UserRegister, FaceVerify, UserResponse
from typing import List

router = APIRouter()

@router.post("/register-face", response_model=UserResponse)
async def register_face(user_data: UserRegister):
    try:
        user = await face_service.register_user(
            user_data.name, 
            user_data.email, 
            user_data.faceDescriptor
        )
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify-face")
async def verify_face(verify_data: FaceVerify):
    user = await face_service.verify_face(verify_data.faceDescriptor)
    if user:
        return {"success": True, "user": user}
    else:
        raise HTTPException(status_code=401, detail="Face not recognized")

@router.get("/users", response_model=List[UserResponse])
async def get_users():
    return await face_service.get_all_users()
