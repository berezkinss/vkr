from fastapi import (
    FastAPI,
)
from fastapi.middleware.cors import CORSMiddleware
from auth.router import router as router_auth
from models import init_models

app = FastAPI()

origins = [
    "http://localhost:5173/",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_start():
    init_models()


@app.get("/")
async def root():
    return "Hello World!"

app.include_router(router_auth)
