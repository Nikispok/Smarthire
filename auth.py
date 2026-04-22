from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from models import User

SECRET_KEY = "nikitasupersecret"

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hash):
    return pwd_context.verify(plain,hash)

def create_token(data: dict):
    data.update({"exp": datetime.utcnow()+timedelta(minutes=30)})
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")

def verify_token(token):
    data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return data["email"]