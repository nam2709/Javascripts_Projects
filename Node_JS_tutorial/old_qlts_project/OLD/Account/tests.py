from django.test import TestCase

from .models import *


# Create your tests here.

class AccountTestCase(TestCase):
    def setUp(self):
        Account.objects.create(username="lion", password="roar")
        Account.objects.create(username="cat", password="meow")
    def test_Account_can_login(self):
        """Animals that can speak are correctly identified"""
        lion = Account.objects.get(username="lion")
        cat = Account.objects.get(username="cat")
        self.assertEqual(lion.name, 'lion')
        self.assertEqual(cat.name, 'cat')
        # csrf_client = Client(enforce_csrf_checks=True)
        # response = csrf_client.post('/login/', {'username': 'john', 'password': 'smith'})
        # print(response)