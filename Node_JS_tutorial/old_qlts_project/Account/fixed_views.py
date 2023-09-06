#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.compat import get_username_field, PasswordField

from django.contrib.auth import authenticate, login, logout

from rest_framework_jwt.views import JSONWebTokenAPIView
from .serializers import *

from .Tserializers import *
from .models import *
from Router.models import *

# Create your views here.
class ObtainJSONWebToken(JSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = LoginJsonWebTokenSerializer
    @classmethod
    def get_extra_actions(cls):
        return []

class AccountRestApiView(viewsets.ModelViewSet):
    serializer_class = AccountGeneralSerializer
    queryset = Account.objects.all()
    pagination_class = SmallResultsSetPagination
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)

class AppPermissionRestApiView(viewsets.ModelViewSet):
    serializer_class = AppPermission_GeneralSerializer
    queryset = AppPermission.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

class WebsiteTemplateRestApiView(viewsets.ModelViewSet):
    serializer_class = WebsiteTemplate_GeneralSerializer
    queryset = WebsiteTemplate.objects.all()
    pagination_class = SmallResultsSetPagination

class ExtendInfoRestApiView(viewsets.ModelViewSet):
    serializer_class = ExtendInfo_GeneralSerializer
    queryset = ExtendInfo.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

class BackendEmailRestApiView(viewsets.ModelViewSet):
    serializer_class = BackendEmail_GeneralSerializer
    queryset = BackendEmail.objects.all()
    pagination_class = SmallResultsSetPagination
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]



class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    @classmethod
    def get_extra_actions(cls):
        return []

class LogoutView(APIView):
    def post(self, request, format=None):
        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                logout(request, user)

                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    @classmethod
    def get_extra_actions(cls):
        return []

# End of TFile



