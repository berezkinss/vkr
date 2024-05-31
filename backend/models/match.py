from sqlalchemy import String, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base


class Match(Base):
    __tablename__ = 'match'
    id: Mapped[int] = mapped_column(primary_key=True)
    home_team: Mapped[str] = mapped_column(String(20))
    guest_team: Mapped[str] = mapped_column(String(20))
    refs: Mapped[list[str]] = mapped_column(ARRAY(String(20)))
