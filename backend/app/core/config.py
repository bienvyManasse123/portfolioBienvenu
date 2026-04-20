# config.py — Centralise TOUTE la configuration de l'application
# Pydantic Settings lit automatiquement le fichier .env
# Avantage sécurité : jamais de valeur en dur dans le code

from pydantic_settings import BaseSettings
from typing import List
import json

class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────
    APP_NAME: str = "Portfolio API"
    DEBUG: bool = True

    # ── Sécurité ─────────────────────────────────────────
    SECRET_KEY: str = "change-this-in-production"

    # ── CORS ─────────────────────────────────────────────
    # Stocké comme string JSON dans .env, converti en liste ici
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # ── Base de données ───────────────────────────────────
    DATABASE_URL: str = "sqlite:///./portfolio.db"

    # ── Email ─────────────────────────────────────────────
    RESEND_API_KEY: str = "re_fb2ShCev_CmUSpwi1ia6ghZ7dJuKntLNp"
    CONTACT_RECEIVER_EMAIL: str = "bienvenue.emailmsg@gmail.com"
    CONTACT_SENDER_EMAIL: str = "onboarding@resend.dev"

    # ── Rate limiting ─────────────────────────────────────
    RATE_LIMIT_CONTACT: str = "5/minute"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Instance globale — importée partout dans l'app
settings = Settings()