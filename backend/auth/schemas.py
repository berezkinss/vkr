from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime

from models.enums import Role


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    surname: str
    email: str
    created_at: datetime
    deleted: bool
    is_active: bool = True


class UserCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    name: str
    surname: str
    email: EmailStr
    password: str


class TokenUserData(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    roles: list[Role]


class TokenPair(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    access: str
    refresh: str


class UserUpdate(BaseModel):
    pass

