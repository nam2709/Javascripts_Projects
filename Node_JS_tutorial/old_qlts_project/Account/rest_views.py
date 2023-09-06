
#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2020 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 4 / 20 / 21
#endregion

#
#
from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError

from .serializers import *
from .models import *
from Router.models import *

# Create your views here.

        
# class MyUserManagerRestApiView(viewsets.ModelViewSet):
#     serializer_class = MyUserManagerSerializer
#     queryset = MyUserManager.objects.all()
#     pagination_class = SmallResultsSetPagination
#     lookup_field = 'uuid'
#
#     # authentication_classes = [
#     #     JWTAuthentication,
#     #     JSONWebTokenAuthentication,
#     #     TokenAuthentication,
#     #     SessionAuthentication,
#     #     BasicAuthentication,
#     # ]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny,]
#     #
#     # def get(self, request, format=None):
#     #     content = {
#     #         'user': str(request.user),  # `django.contrib.auth.User` instance.
#     #         'auth': str(request.auth),  # None
#     #     }
#     #     return Response(content)
#     #
#     # def put(self, request, filename, format=None):
#     #     file_obj = request.FILES['file']
#     #     # do some stuff with uploaded file
#     #     return Response(status=204)
#
#     # def perform_create(self, serializer):
#     #     serializer.save(author=self.request.user)
#
#     # def get_queryset(self):
#     #     user = self.request.user
#     #     return models.MyUserManager.objects.filter(author=user)
#
#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         self.perform_destroy(instance)
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#     def perform_destroy(self, instance):
#         instance.delete()
#
#
# class MyUserManagerListRestApiView(viewsets.ModelViewSet):
#     serializer_class = MyUserManagerListSerializer
#     queryset = MyUserManager.objects.all()
#     # pagination_class = SmallResultsSetPagination
#     lookup_field = 'uuid'
#
#     # authentication_classes = [
#     #     JWTAuthentication,
#     #     JSONWebTokenAuthentication,
#     #     TokenAuthentication,
#     #     SessionAuthentication,
#     #     BasicAuthentication,
#     # ]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny,]
#     #
#     # def get(self, request, format=None):
#     #     content = {
#     #         'user': str(request.user),  # `django.contrib.auth.User` instance.
#     #         'auth': str(request.auth),  # None
#     #     }
#     #     return Response(content)
#     #
#     # def put(self, request, filename, format=None):
#     #     file_obj = request.FILES['file']
#     #     # do some stuff with uploaded file
#     #     return Response(status=204)
#
#     # def perform_create(self, serializer):
#     #     serializer.save(author=self.request.user)
#
#     # def get_queryset(self):
#     #     user = self.request.user
#     #     return models.MyUserManager.objects.filter(author=user)
#
#     # def destroy(self, request, *args, **kwargs):
#     #     instance = self.get_object()
#     #     self.perform_destroy(instance)
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
#     #
#     # def perform_destroy(self, instance):
#     #     instance.delete()
#
#
# class MyUserManagerDeleteRestApiView(viewsets.ModelViewSet):
#     serializer_class = MyUserManagerDeleteSerializer
#     queryset = MyUserManager.objects.all()
#     # pagination_class = SmallResultsSetPagination
#     lookup_field = 'uuid'
#
#     # authentication_classes = [
#     #     JWTAuthentication,
#     #     JSONWebTokenAuthentication,
#     #     TokenAuthentication,
#     #     SessionAuthentication,
#     #     BasicAuthentication,
#     # ]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny,]
#     #
#     # def get(self, request, format=None):
#     #     content = {
#     #         'user': str(request.user),  # `django.contrib.auth.User` instance.
#     #         'auth': str(request.auth),  # None
#     #     }
#     #     return Response(content)
#     #
#     # def put(self, request, filename, format=None):
#     #     file_obj = request.FILES['file']
#     #     # do some stuff with uploaded file
#     #     return Response(status=204)
#
#     # def perform_create(self, serializer):
#     #     serializer.save(author=self.request.user)
#
#     # def get_queryset(self):
#     #     user = self.request.user
#     #     return models.MyUserManager.objects.filter(author=user)
#
#     # def destroy(self, request, *args, **kwargs):
#     #     instance = self.get_object()
#     #     self.perform_destroy(instance)
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
#     #
#     # def perform_destroy(self, instance):
#     #     instance.delete()
#
#
# class MyUserManagerUpdateRestApiView(viewsets.ModelViewSet):
#     serializer_class = MyUserManagerUpdateSerializer
#     queryset = MyUserManager.objects.all()
#     # pagination_class = SmallResultsSetPagination
#     lookup_field = 'uuid'
#
#     # authentication_classes = [
#     #     JWTAuthentication,
#     #     JSONWebTokenAuthentication,
#     #     TokenAuthentication,
#     #     SessionAuthentication,
#     #     BasicAuthentication,
#     # ]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny,]
#     #
#     # def get(self, request, format=None):
#     #     content = {
#     #         'user': str(request.user),  # `django.contrib.auth.User` instance.
#     #         'auth': str(request.auth),  # None
#     #     }
#     #     return Response(content)
#     #
#     # def put(self, request, filename, format=None):
#     #     file_obj = request.FILES['file']
#     #     # do some stuff with uploaded file
#     #     return Response(status=204)
#
#     # def perform_create(self, serializer):
#     #     serializer.save(author=self.request.user)
#
#     # def get_queryset(self):
#     #     user = self.request.user
#     #     return models.MyUserManager.objects.filter(author=user)
#
#     # def destroy(self, request, *args, **kwargs):
#     #     instance = self.get_object()
#     #     self.perform_destroy(instance)
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
#     #
#     # def perform_destroy(self, instance):
#     #     instance.delete()
#
#
