from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str

class TaskUpdate(BaseModel):
    completed: bool

class TaskResponse(BaseModel):
    id: str
    title: str
    completed: bool
