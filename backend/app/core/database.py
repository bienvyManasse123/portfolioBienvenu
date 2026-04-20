# database.py — Configuration de la connexion SQLAlchemy
# SQLAlchemy est l'ORM : il traduit Python ↔ SQL
# On utilise SQLite en dev (fichier local, zéro config)
# et PostgreSQL en prod (Railway le fournit gratuitement)

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# connect_args seulement nécessaire pour SQLite (gestion des threads)
connect_args = {"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    # Pool de connexions — important pour la prod
    pool_pre_ping=True,  # vérifie que la connexion est vivante avant chaque requête
)

# Session locale — chaque requête HTTP a sa propre session BDD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base pour tous nos modèles
Base = declarative_base()

# Dépendance FastAPI — injectée dans chaque endpoint qui a besoin de la BDD
# Le "finally" garantit que la session se ferme même si une erreur survient
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()