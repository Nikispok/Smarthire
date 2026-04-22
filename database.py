from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://postgres:ZQeMLdUSYYpQXweDtgtdcHrEaIUdGUQp@shortline.proxy.rlwy.net:41001/railway"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()