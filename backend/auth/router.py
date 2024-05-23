from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_async_session
from auth.models import user

router = APIRouter(
    prefix="/registration",
    tags=["registration"],
)




@router.get("/get_user_info")
async def get_user_info(user_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(user).where(user.c.id == user_id)
    ret = await session.execute(query)
    return ret.mappings().all()





