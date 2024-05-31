from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase,  sessionmaker
from config import settings


DATABASE_URL = settings.db_url


class Base(DeclarativeBase):
    pass


engine = create_engine(DATABASE_URL)
session_maker = sessionmaker(engine, expire_on_commit=False)


def get_session():
    with session_maker() as session:
        yield session

