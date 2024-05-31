from http.client import HTTPException
from typing import Annotated
from fastapi import APIRouter, Depends, Body
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette import status

from auth.schemas import UserRead, UserCreate, TokenPair
from db.database import get_session
from models.enums import Role
from models.user import User
from .JWTStrategy import JWTStrategy
from config import settings

jwt = JWTStrategy(secret=settings.SECRET)

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post('/new_user')
def create_user(request: UserCreate, session: Session = Depends(get_session)) -> TokenPair:
    user = session.query(User).filter_by(email=request.email).first()
    if not user:
        user = User(
            email=request.email.lower(),
            password=request.password,
            name=request.name,
            surname=request.surname,
            roles=[Role.Admin]
        )
        session.add(user)
        session.commit()
        return jwt.issue_token_pair(user)
    else:
        raise HTTPException("User already exists")


@router.post("/login")
def login(email: Annotated[EmailStr, Body()], password: Annotated[str, Body()],
          session: Session = Depends(get_session)) -> TokenPair:
    query = select(User).where(User.email == email.lower())
    ret = session.execute(query)
    user = ret.scalar_one_or_none()
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    if user.password != password:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    if user.deleted is True:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return jwt.issue_token_pair(user)


@router.get("/get_user_info")
def get_user_info(user_id: int, session: Session = Depends(get_session)) -> UserRead | None:
    query = select(User).where(User.id == user_id)
    ret = session.execute(query)
    user = ret.scalar_one_or_none()
    if user:
        return UserRead.model_validate(user)
    else:
        return None
