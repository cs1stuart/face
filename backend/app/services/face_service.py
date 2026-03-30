import numpy as np
from uuid import uuid4
from ..db import memory_db

async def register_user(name: str, email: str, face_descriptor: list):
    user_id = str(uuid4())
    user = {
        "id": user_id,
        "name": name,
        "email": email,
        "faceDescriptor": face_descriptor
    }
    memory_db.users.append(user)
    return user

async def verify_face(face_descriptor: list):
    if not memory_db.users:
        return None
    
    input_vector = np.array(face_descriptor)
    best_match = None
    min_distance = 0.6 # Threshold
    
    for user in memory_db.users:
        stored_vector = np.array(user["faceDescriptor"])
        distance = np.linalg.norm(input_vector - stored_vector)
        
        if distance < min_distance:
            min_distance = distance
            best_match = {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
            
    return best_match

async def get_all_users():
    return [{"id": u["id"], "name": u["name"], "email": u["email"]} for u in memory_db.users]
