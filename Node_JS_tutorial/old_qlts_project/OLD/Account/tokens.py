#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
__author__ = 'root'
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

class TokenGenerator(PasswordResetTokenGenerator):

    def _make_hash_value(self, user, timestamp):
        return six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active)


account_activation_token = TokenGenerator()