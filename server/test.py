import unittest
from app import app

class AuthTestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_register(self):
        response = self.client.post('/register', data={'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('User registered successfully', response.json['message'])

    def test_login(self):
        # Register a user first
        self.client.post('/register', data={'username': 'testuser', 'password': 'testpassword'})
        # Attempt to log in
        response = self.client.post('/login', data={'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('User logged in successfully', response.json['message'])

if __name__ == '__main__':
    unittest.main()
