# message.py — Modèle SQLAlchemy pour les messages de contact
# Ce modèle crée automatiquement la table "messages" en BDD
# Chaque attribut = une colonne dans la table

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base

class Message(Base):
    __tablename__ = "messages"

    # Clé primaire auto-incrémentée
    id = Column(Integer, primary_key=True, index=True)

    # Données du formulaire
    name    = Column(String(100), nullable=False)
    email   = Column(String(255), nullable=False, index=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)

    # Métadonnées utiles
    # server_default=func.now() : SQLAlchemy laisse la BDD générer la date
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Pour savoir si tu as répondu au message (utile pour toi)
    is_read    = Column(Boolean, default=False)

    # IP du visiteur — utile pour détecter le spam
    ip_address = Column(String(45), nullable=True)

    def __repr__(self):
        return f"<Message from {self.name} ({self.email}) at {self.created_at}>"