# contact.py — Endpoint POST /api/contact
#
# Ce fichier reçoit la requête HTTP, applique le rate limiting,
# extrait l'IP, appelle le service et retourne la réponse

from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.database import get_db
from app.core.config import settings
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import process_contact_form

router  = APIRouter(tags=["contact"])
limiter = Limiter(key_func=get_remote_address)

@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Envoyer un message de contact",
    description="Reçoit le formulaire, sauvegarde en BDD et envoie un email de notification.",
)
@limiter.limit(settings.RATE_LIMIT_CONTACT)  # 5 requêtes/minute par IP
async def send_contact(
    request: Request,                    # nécessaire pour le rate limiter et l'IP
    data:    ContactCreate,              # Pydantic valide automatiquement le body JSON
    db:      Session = Depends(get_db),  # injection de la session BDD
):
    """
    Endpoint principal du formulaire de contact.
    
    Sécurités appliquées :
    - Rate limiting : 5 req/min par IP (anti-spam)
    - Validation Pydantic : longueurs, format email, caractères interdits
    - IP loggée en BDD pour audit
    """
    # Récupère l'IP réelle (derrière un proxy comme Railway/Vercel)
    ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else None)
    # Si plusieurs IPs (chaîne de proxies), prendre la première
    if ip and "," in ip:
        ip = ip.split(",")[0].strip()

    try:
        result = await process_contact_form(data=data, db=db, ip_address=ip)
        return ContactResponse(success=True, message=result["message"])

    except Exception as e:
        # Log l'erreur serveur mais ne pas exposer les détails au client
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur est survenue. Veuillez réessayer.",
        )