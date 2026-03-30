from uuid import uuid4
from ..db.fake_db import tasks

async def get_all_tasks():
    return tasks

async def create_task(title: str):
    new_task = {
        "id": str(uuid4()),
        "title": title,
        "completed": False
    }
    tasks.append(new_task)
    return new_task

async def delete_task(task_id: str):
    global tasks
    initial_len = len(tasks)
    tasks = [t for t in tasks if t["id"] != task_id]
    return len(tasks) < initial_len

async def update_task(task_id: str, completed: bool):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = completed
            return task
    return None
