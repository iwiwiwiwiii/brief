from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid

from backend import models, schemas
from backend.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SpbTech Brief Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/briefs", response_model=schemas.BriefCreateResponse, status_code=status.HTTP_201_CREATED)
def create_brief(brief_data: schemas.BriefCreate, db: Session = Depends(get_db)):
    short_id = str(uuid.uuid4())[:8]
    edit_token = str(uuid.uuid4())
    
    db_brief = models.Brief(
        short_id=short_id,
        edit_token=edit_token,
        project_name=brief_data.project_name,
        description=brief_data.description,
        figma_link=brief_data.figma_link,
        contacts=brief_data.contacts
    )
    db.add(db_brief)
    db.commit()
    db.refresh(db_brief)
    return db_brief

@app.get("/api/briefs/{short_id}", response_model=schemas.BriefResponse)
def get_brief(short_id: str, db: Session = Depends(get_db)):
    brief = db.query(models.Brief).filter(models.Brief.short_id == short_id).first()
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")
    return brief

@app.put("/api/briefs/{edit_token}", response_model=schemas.BriefResponse)
def update_brief(edit_token: str, update_data: schemas.BriefUpdate, db: Session = Depends(get_db)):
    brief = db.query(models.Brief).filter(models.Brief.edit_token == edit_token).first()
    if not brief:
        raise HTTPException(status_code=403, detail="Invalid edit token or brief not found")
    
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(brief, key, value)
        
    db.commit()
    db.refresh(brief)
    return brief