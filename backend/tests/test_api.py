"""
Backend API Tests for Kwerky Media Website
Tests: Health check, Contact form submission
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check and root endpoint tests"""
    
    def test_root_endpoint(self):
        """Test root API endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print(f"Root endpoint working: {data}")


class TestContactForm:
    """Contact form submission tests"""
    
    def test_contact_form_success(self):
        """Test successful contact form submission"""
        payload = {
            "name": "TEST_John",
            "email": "test@example.com",
            "message": "This is a test message from automated testing"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        # Status assertion
        assert response.status_code == 200
        
        # Data assertions
        data = response.json()
        assert "id" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "timestamp" in data
        print(f"Contact form submission successful: {data['id']}")
    
    def test_contact_form_with_optional_fields(self):
        """Test contact form with optional company and service_interest fields"""
        payload = {
            "name": "TEST_Jane",
            "email": "jane@techcompany.com",
            "company": "Tech Corp",
            "message": "Interested in content services",
            "service_interest": "Website Content"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["message"] == payload["message"]
        assert data["service_interest"] == payload["service_interest"]
        print(f"Contact form with optional fields successful: {data['id']}")
    
    def test_contact_form_missing_required_fields(self):
        """Test contact form fails with missing required fields"""
        # Missing name
        payload = {
            "email": "test@example.com",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("Contact form correctly rejects missing name field")
        
        # Missing email
        payload = {
            "name": "Test User",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print("Contact form correctly rejects missing email field")
        
        # Missing message
        payload = {
            "name": "Test User",
            "email": "test@example.com"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print("Contact form correctly rejects missing message field")


class TestStatusEndpoint:
    """Status endpoint tests"""
    
    def test_create_status_check(self):
        """Test creating a status check"""
        payload = {"client_name": "TEST_AutomatedTest"}
        response = requests.post(f"{BASE_URL}/api/status", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["client_name"] == payload["client_name"]
        assert "timestamp" in data
        print(f"Status check created: {data['id']}")
    
    def test_get_status_checks(self):
        """Test retrieving status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Retrieved {len(data)} status checks")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
