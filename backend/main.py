from fastapi import (
    FastAPI, Depends,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi_users import FastAPIUsers
from auth.base_config import auth_backend
from db.database import User, get_async_session
from auth.manager import get_user_manager
from auth.schemas import UserRead, UserCreate
from auth.router import router as router_auth
from sqlalchemy.ext.asyncio import AsyncSession
######initializing########
app = FastAPI()

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)
origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    expose_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
current_user = fastapi_users.current_user()


########entry point#######
@app.get("/")
async def get_user_info(session: AsyncSession = Depends(get_async_session)):
    return


#########routes#######
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)


app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(router_auth)


@app.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.email}"
########other###########








