from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BriefBase(BaseModel):
    project_name: str = Field(..., max_length=150)
    description: str
    figma_link: Optional[str] = Field(None, max_length=500)
    contacts: str = Field(..., max_length=200)

class BriefCreate(BriefBase):
    pass

class BriefUpdate(BriefBase):
    project_name: Optional[str] = Field(None, max_length=150)
    description: Optional[str] = None
    figma_link: Optional[str] = Field(None, max_length=500)
    contacts: Optional[str] = Field(None, max_length=200)

class BriefResponse(BriefBase):
    id: int
    short_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class BriefCreateResponse(BriefResponse):
    edit_token: str