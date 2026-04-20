# contact.py — Schemas Pydantic pour le formulaire de contact
#
# Pydantic = gardien de sécurité à l'entrée de ton API
# Il valide, nettoie et type-check TOUTES les données avant
# qu'elles touchent ta logique ou ta BDD
#
# Si une donnée est invalide → erreur 422 automatique, propre, sécurisée

from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
import re

class ContactCreate(BaseModel):
    """Schema de création — ce que le frontend envoie"""
    name:    str
    email:   EmailStr           # Pydantic valide le format email automatiquement
    subject: Optional[str] = None
    message: str

    # ── Validators personnalisés ───────────────────────────

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Le nom doit contenir au moins 2 caractères")
        if len(v) > 100:
            raise ValueError("Le nom ne peut pas dépasser 100 caractères")
        # Bloque les injections HTML/JS basiques
        if re.search(r'[<>{}]', v):
            raise ValueError("Caractères non autorisés dans le nom")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Le message doit contenir au moins 10 caractères")
        if len(v) > 5000:
            raise ValueError("Le message ne peut pas dépasser 5000 caractères")
        return v

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        v = v.strip()
        if len(v) > 200:
            raise ValueError("Le sujet ne peut pas dépasser 200 caractères")
        return v if v else None

class ContactResponse(BaseModel):
    """Schema de réponse — ce que l'API retourne au frontend"""
    success: bool
    message: str

class MessageOut(BaseModel):
    """Schema de lecture d'un message — pour consultation future"""
    id:         int
    name:       str
    email:      str
    subject:    Optional[str]
    message:    str
    is_read:    bool
    created_at: str

    class Config:
        from_attributes = True  # permet de lire depuis un objet SQLAlchemy