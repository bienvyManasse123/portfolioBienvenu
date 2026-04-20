# email_service.py — Gère l'envoi d'emails via Resend
#
# Pourquoi Resend ?
# - Gratuit : 100 emails/jour, 3000/mois
# - Fiable : meilleur taux de délivrabilité que SMTP direct
# - Simple : une seule ligne pour envoyer
# - Parfait pour Railway (aucune config SMTP à gérer)
#
# Inscription : https://resend.com → gratuit, pas de CB

import resend
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Configure la clé API Resend au démarrage
resend.api_key = settings.RESEND_API_KEY

async def send_contact_notification(
    sender_name:  str,
    sender_email: str,
    subject:      str,
    message:      str,
) -> bool:
    """
    Envoie un email de notification dans ta boîte
    quand quelqu'un remplit le formulaire de contact.
    Retourne True si succès, False sinon.
    """
    # Si pas de clé API configurée → log et continue sans planter
    if not settings.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY non configuré — email non envoyé")
        return False

    subject_line = subject or "Nouveau message de contact"

    # Template HTML de l'email que tu reçois
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {{ font-family: Inter, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }}
        .card {{ background: #fff; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; }}
        .header {{ border-bottom: 2px solid #00e676; padding-bottom: 16px; margin-bottom: 24px; }}
        .badge {{ display: inline-block; background: #00e676; color: #000; padding: 4px 12px;
                  border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 12px; }}
        .label {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
                  color: #888; margin-bottom: 4px; }}
        .value {{ font-size: 15px; color: #1a1a1a; margin-bottom: 20px; }}
        .message-box {{ background: #f9f9f9; border-left: 3px solid #00e676;
                        padding: 16px; border-radius: 4px; margin-top: 8px; }}
        .footer {{ margin-top: 24px; font-size: 12px; color: #999; text-align: center; }}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">Nouveau message</span>
          <h2 style="margin:0;font-size:20px;">Portfolio — Formulaire de contact</h2>
        </div>
        <div class="label">Nom</div>
        <div class="value">{sender_name}</div>
        <div class="label">Email</div>
        <div class="value"><a href="mailto:{sender_email}">{sender_email}</a></div>
        <div class="label">Sujet</div>
        <div class="value">{subject_line}</div>
        <div class="label">Message</div>
        <div class="message-box">{message.replace(chr(10), '<br>')}</div>
        <div class="footer">
          Reçu depuis ton portfolio · <a href="mailto:{sender_email}">Répondre directement</a>
        </div>
      </div>
    </body>
    </html>
    """

    try:
        resend.Emails.send({
            "from":    settings.CONTACT_SENDER_EMAIL,
            "to":      [settings.CONTACT_RECEIVER_EMAIL],
            "subject": f"[Portfolio] {subject_line} — {sender_name}",
            "html":    html_content,
            # Reply-to : quand tu cliques "Répondre" dans Gmail → ça répond au visiteur
            "reply_to": sender_email,
        })
        logger.info(f"Email envoyé pour {sender_email}")
        return True

    except Exception as e:
        # On log l'erreur mais on NE plante PAS l'API
        # Le message est quand même sauvegardé en BDD
        logger.error(f"Erreur envoi email : {e}")
        return False