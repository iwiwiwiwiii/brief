from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Brief(Base):
    __tablename__ = "briefs"

    id = Column(Integer, primary_key=True, index=True)
    short_id = Column(String, unique=True, index=True)
    edit_token = Column(String, unique=True, index=True)
    project_name = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    figma_link = Column(String(500), nullable=True)
    contacts = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)