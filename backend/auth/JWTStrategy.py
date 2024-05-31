import jwt
from models.user import User
from datetime import datetime, timedelta
from .schemas import TokenPair


class JWTStrategy:
    def __init__(self, secret):
        self.secret = secret

    def issue_access_token(self, user: User):
        return jwt.encode(
            {"type": "access", "exp": (datetime.now() + timedelta(hours=1)).timestamp(), "user_id": user.id,
             "roles": list(map(lambda x: x.value, user.roles))},
            self.secret, algorithm="HS256")

    def issue_refresh_token(self, user: User):
        return jwt.encode(
            {"type": "refresh", "exp": (datetime.now() + timedelta(days=10)).timestamp(), "user_id": user.id,
             "roles": list(map(lambda x: x.value, user.roles))},
            self.secret, algorithm="HS256")

    def issue_token_pair(self, user: User):
        return TokenPair(access=self.issue_access_token(user), refresh=self.issue_refresh_token(user))

    def validate_token(self, token):
        return jwt.decode(token, self.secret, algorithms=["HS256"])
