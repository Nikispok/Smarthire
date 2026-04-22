from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    user_id = Column(Integer, ForeignKey("users.id"))
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String)
    role = Column(String)
    status = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
