# health.py — Endpoint GET /api/health
#
# Utilisé par Railway pour vérifier que l'app tourne
# Si ce endpoint répond → le déploiement est considéré comme réussi
# Sans ça, Railway peut redémarrer ton service en boucle

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db
from app.core.config import settings

router = APIRouter(tags=["health"])

@router.get("/health", summary="Vérification de l'état de l'API")
async def health_check(db: Session = Depends(get_db)):
    """
    Vérifie que :
    1. L'API FastAPI répond
    2. La connexion BDD fonctionne
    """
    try:
        # Teste la connexion BDD avec une requête minimale
        db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception:
        db_status = "error"

    return {
        "status":   "ok",
        "app":      settings.APP_NAME,
        "database": db_status,
        "debug":    settings.DEBUG,
    }