import datetime

from sqlalchemy import MetaData, Integer, String, Boolean, Column, ForeignKey, DATETIME, Table, JSON
metadata = MetaData()

role = Table(
    "role",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("permissions", JSON, nullable=False),
)

user = Table(
    "user",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("surname", String, nullable=False),
    Column("role_id", Integer, ForeignKey(role.c.id), nullable=False),
    Column("created_at", DATETIME, nullable=False, default=datetime.datetime.now().strftime("%Y-%m-%d")),
    Column("deleted", Boolean, nullable=False),
    Column("email", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("is_active", Boolean, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)

permission = Table(
    "permission",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("type", String, nullable=False),
    Column("value", String, nullable=False),
    Column("deleted", Boolean, nullable=False),
)