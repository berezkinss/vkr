from datetime import datetime

from sqlalchemy import String, func, ARRAY, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base
from db.types import Enum
from .enums import Role


class User(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(50))
    password: Mapped[str] = mapped_column(String(20))
    name: Mapped[str] = mapped_column(String(20))
    surname: Mapped[str] = mapped_column(String(20))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=False), server_default=func.now())
    deleted: Mapped[bool] = mapped_column(default=False, nullable=False)
    roles: Mapped[list[Role]] = mapped_column(ARRAY(Enum(Role)))
