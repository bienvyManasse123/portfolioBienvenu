# contact_service.py — Logique métier du formulaire de contact
#
# Le service fait le lien entre le router (HTTP) et la BDD/email
# Séparer la logique ici = code testable, réutilisable, propre

from sqlalchemy.orm import Session
from app.models.message import Message
from app.schemas.contact import ContactCreate
from app.services.email_service import send_contact_notification
import logging

logger = logging.getLogger(__name__)

async def process_contact_form(
    data:       ContactCreate,
    db:         Session,
    ip_address: str | None = None,
) -> dict:
    """
    1. Sauvegarde le message en BDD
    2. Envoie un email de notification
    3. Retourne le résultat
    """

    # ── 1. Sauvegarde en BDD ──────────────────────────────
    db_message = Message(
        name       = data.name,
        email      = data.email,
        subject    = data.subject,
        message    = data.message,
        ip_address = ip_address,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)  # récupère l'id généré par la BDD

    logger.info(f"Message #{db_message.id} sauvegardé de {data.email}")

    # ── 2. Envoi email (asynchrone, ne bloque pas si ça échoue) ─
    email_sent = await send_contact_notification(
        sender_name  = data.name,
        sender_email = data.email,
        subject      = data.subject or "Sans sujet",
        message      = data.message,
    )

    # ── 3. Réponse ────────────────────────────────────────
    return {
        "success":    True,
        "message":    "Message reçu ! Je te réponds dans les 24h.",
        "email_sent": email_sent,  # info interne, pas exposée au frontend
    }