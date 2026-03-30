from fastapi import APIRouter, HTTPException
from ..schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from ..services import task_service
from typing import List

router = APIRouter()

@router.get("/", response_model=List[TaskResponse])
async def read_tasks():
    return await task_service.get_all_tasks()

@router.post("/", response_model=TaskResponse)
async def add_task(task: TaskCreate):
    return await task_service.create_task(task.title)

@router.delete("/{task_id}")
async def remove_task(task_id: str):
    success = await task_service.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}

@router.put("/{task_id}", response_model=TaskResponse)
async def edit_task(task_id: str, task: TaskUpdate):
    updated_task = await task_service.update_task(task_id, task.completed)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task
