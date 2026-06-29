from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://my_project_db_4dc4_user:xcDvLuYMTAQ4mpEhItgozgwa2Y2bweDb@dpg-d912j5pkh4rs739s7p20-a.ohio-postgres.render.com/my_project_db_4dc4"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()