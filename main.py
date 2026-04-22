from fastapi import FastAPI
from pydantic import BaseModel
from database import engine, Base, SessionLocal
from models import Job as JobModel
from models import User as UserModel
from schemas import UserCreate, UserLogin,JobRequest
from auth import hash_password, verify_password, create_token, verify_token
from fastapi import Header
from fastapi.middleware.cors import CORSMiddleware
from ai import get_ai_advice


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message" : "smarthire FastAPI is working!"}

@app.get("/jobs")
def get_jobs(authorization: str = Header(...)):
    db = SessionLocal()
    try:

        email = verify_token(authorization)
        user = db.query(UserModel).filter(UserModel.email == email).first()
        return db.query(JobModel).filter(JobModel.user_id == user.id).all() 
    finally:
        db.close()

@app.get("/jobs/{id}")
def get_job_by_id(id: int):
    db = SessionLocal()
    try:
        for i in db.query(JobModel).all() :
            if i.id == id:
                return i
        return "Have no job with this id"
    finally:
        db.close()

class Job(BaseModel):
    company: str
    role: str
    status: str

@app.post("/jobs")
def add_job(job: Job, authorization: str = Header(...)):
    db = SessionLocal()
    email = verify_token(authorization)
    user = db.query(UserModel).filter(UserModel.email == email).first()
    new_job = JobModel(user_id = user.id, company = job.company, role = job.role, status = job.status )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    db.close()
    return new_job

@app.delete("/jobs/{id}")
def remove_job(id: int):
    db = SessionLocal()
    try:
        for i in db.query(JobModel).all() :
            if i.id == id:
                db.delete(i)
                db.commit()
                return {"message": f"Item with id {id} was deleted"} 
        return "Didn't found"
    finally:
        db.close()

@app.post("/auth/register")
def register(user: UserCreate):
    db = SessionLocal()
    try:
        for i in db.query(UserModel).all():
            if i.email == user.email:
                return {"message": f"User {user.email} have already registered!!!"}
        new_user = UserModel(email = user.email, hashed_password = hash_password(user.password))
        db.add(new_user)
        db.commit()
        return {"message": "registered!"}
    finally:
        db.close()

@app.post("/auth/login")
def login(user: UserLogin):
    db = SessionLocal()
    try:
        for i in db.query(UserModel).all():
            if i.email == user.email:
                print(f"verify result: {verify_password(user.password, i.hashed_password)}")
                if verify_password(user.password, i.hashed_password):
                    return create_token({"email": i.email})
                else:
                    return {"message": "wrong password"}
        return {"message": "user not found"}
    finally:
        db.close()

@app.put("/jobs/{id}")
def edit_job(id: int, job: Job):
    db = SessionLocal()
    try:
        edited_job = db.query(JobModel).filter(JobModel.id == id).first()
        edited_job.company = job.company
        edited_job.role = job.role
        edited_job.status = job.status
        db.commit()
        db.refresh(edited_job)
        return edited_job
    finally:
        db.close()


@app.post("/ai-adv")
def ai_advice(data: JobRequest):
    advice = get_ai_advice(data.company, data.role)
    return {"advice": advice}

