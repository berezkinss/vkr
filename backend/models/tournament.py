from datetime import datetime

from sqlalchemy import String, func, DateTime
from sqlalchemy.orm import Mapped, mapped_column, Relationship

from db.database import Base
from .match import Match


class Tournament(Base):
    __tablename__ = 'tournament'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(20))
    date_start: Mapped[datetime] = mapped_column(DateTime(timezone=False), server_default=func.now())
    date_end: Mapped[datetime] = mapped_column(DateTime(timezone=False))
    #matches: Mapped[Match] = Relationship("matches", back_populates="tournament")




