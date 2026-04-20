# test_contact.py — Tests du formulaire de contact
#
# Lance avec : pytest tests/ -v
# Ces tests vérifient que la validation Pydantic fonctionne
# et que les endpoints répondent correctement

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.database import Base, get_db

# BDD de test en mémoire — séparée de la vraie BDD
TEST_DATABASE_URL = "sqlite:///./test.db"
engine_test = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)

def override_get_db():
    """Remplace la BDD réelle par la BDD de test"""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Injection de la BDD de test
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_db():
    """Crée et détruit les tables avant/après chaque test"""
    Base.metadata.create_all(bind=engine_test)
    yield
    Base.metadata.drop_all(bind=engine_test)

client = TestClient(app)

# ── Tests health ──────────────────────────────────────────

def test_health_check():
    """L'endpoint health doit répondre 200"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "ok"

# ── Tests contact valides ─────────────────────────────────

def test_contact_valid():
    """Un message valide doit être accepté"""
    response = client.post("/api/contact", json={
        "name":    "Jean Dupont",
        "email":   "jean@example.com",
        "subject": "Test sujet",
        "message": "Ceci est un message de test suffisamment long.",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True

def test_contact_without_subject():
    """Le sujet est optionnel"""
    response = client.post("/api/contact", json={
        "name":    "Marie Martin",
        "email":   "marie@example.com",
        "message": "Message sans sujet, mais suffisamment long pour être valide.",
    })
    assert response.status_code == 201

# ── Tests contact invalides ───────────────────────────────

def test_contact_invalid_email():
    """Un email invalide doit être rejeté (422)"""
    response = client.post("/api/contact", json={
        "name":    "Test",
        "email":   "pas-un-email",
        "message": "Message de test valide.",
    })
    assert response.status_code == 422

def test_contact_name_too_short():
    """Un nom trop court doit être rejeté"""
    response = client.post("/api/contact", json={
        "name":    "A",
        "email":   "test@example.com",
        "message": "Message de test valide et suffisamment long.",
    })
    assert response.status_code == 422

def test_contact_message_too_short():
    """Un message trop court doit être rejeté"""
    response = client.post("/api/contact", json={
        "name":    "Jean Dupont",
        "email":   "jean@example.com",
        "message": "Court",
    })
    assert response.status_code == 422

def test_contact_xss_attempt():
    """Les tentatives d'injection HTML dans le nom doivent être rejetées"""
    response = client.post("/api/contact", json={
        "name":    "<script>alert('xss')</script>",
        "email":   "hacker@example.com",
        "message": "Tentative d'injection XSS dans le nom.",
    })
    assert response.status_code == 422

def test_contact_missing_fields():
    """Les champs requis manquants doivent être rejetés"""
    response = client.post("/api/contact", json={
        "name": "Jean Dupont",
        # email et message manquants
    })
    assert response.status_code == 422