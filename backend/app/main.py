# main.py — Point d'entrée de l'application FastAPI
#
# C'est ici que tout est assemblé :
# middlewares, CORS, rate limiting, routes
# Uvicorn démarre ce fichier : uvicorn app.main:app --reload

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.database import engine, Base
from app.api.routes import contact, health

# ── Logging ───────────────────────────────────────────────
# Configure les logs pour voir ce qui se passe en prod
logging.basicConfig(
    level   = logging.INFO if not settings.DEBUG else logging.DEBUG,
    format  = "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    datefmt = "%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── Rate Limiter ──────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── Lifespan — s'exécute au démarrage et à l'arrêt ───────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # DÉMARRAGE : crée les tables BDD si elles n'existent pas
    logger.info("Démarrage de l'application...")
    Base.metadata.create_all(bind=engine)
    logger.info("Tables BDD créées/vérifiées")
    logger.info(f"CORS autorisé pour : {settings.ALLOWED_ORIGINS}")
    yield
    # ARRÊT : cleanup si nécessaire
    logger.info("Arrêt de l'application")

# ── Application FastAPI ───────────────────────────────────
app = FastAPI(
    title       = settings.APP_NAME,
    description = "API du portfolio — formulaire de contact",
    version     = "1.0.0",
    # Swagger UI désactivé en production pour ne pas exposer la doc
    docs_url    = "/docs" if settings.DEBUG else None,
    redoc_url   = "/redoc" if settings.DEBUG else None,
    lifespan    = lifespan,
)

# ── Rate limiter ──────────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

# ── CORS ─────────────────────────────────────────────────
# CORS = Cross-Origin Resource Sharing
# Sans ça, le navigateur bloque les requêtes depuis ton frontend
# On autorise UNIQUEMENT les origines listées dans .env
app.add_middleware(
    CORSMiddleware,
    allow_origins     = settings.ALLOWED_ORIGINS,
    allow_credentials = True,
    allow_methods     = ["GET", "POST", "OPTIONS"],  # seulement ce dont on a besoin
    allow_headers     = ["Content-Type", "Authorization"],
)

# ── Middleware de sécurité ────────────────────────────────
@app.middleware("http")
async def security_headers(request: Request, call_next):
    """Ajoute des headers de sécurité à chaque réponse"""
    response = await call_next(request)
    # Empêche l'affichage dans une iframe (clickjacking)
    response.headers["X-Frame-Options"] = "DENY"
    # Empêche le sniffing MIME
    response.headers["X-Content-Type-Options"] = "nosniff"
    # Force HTTPS en prod
    if not settings.DEBUG:
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# ── Routes ────────────────────────────────────────────────
app.include_router(contact.router, prefix="/api")
app.include_router(health.router,  prefix="/api")

# ── Route racine ─────────────────────────────────────────
@app.get("/", include_in_schema=False)
async def root():
    return {"message": f"{settings.APP_NAME} is running"}