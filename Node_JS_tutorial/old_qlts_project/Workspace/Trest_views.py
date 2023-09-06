
#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'TruongNV - NGUYEN VAN TRUONG'
__copyright__ = "Copyright ©2022 TruongNV <truongg.nv@gmail.com>"
__maintainer__ = "TruongNV"
__email__ = "truongg.nv@gmail.com"
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
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError
            
from rest_framework import generics
from rest_framework import filters
from .Tserializers import *
# from .models import *
from Router.models import *
from functools import reduce
import operator

from django.db.models import Q
# Create your views here.

        
# from .models import *
# from RunningTaskManagement.models import *
# from RunningTaskManagement.models_genaral import *
# from .models import *


class ConfigSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = ConfigSerializer

    queryset = Config.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return Config.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class ConfigFilterRestApiView(generics.ListAPIView):
    serializer_class = ConfigSerializer

    # queryset = Config.objects.all().order_by("-created_at")
    
    # queryset = Config.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Config.objects.all().order_by("-created_at")
    
        # queryset =  Config.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class ConfigFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = ConfigSerializer

    # queryset = Config.objects.all().order_by("created_at")
    
    # queryset = Config.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Config.objects.all().order_by("created_at")
    
        # queryset =  Config.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class ConfigFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = ConfigSerializer

    # queryset = Config.objects.all().order_by("created_at")
    
    # queryset = Config.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Config.objects.all().order_by("created_at")
    
        # queryset =  Config.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class ConfigRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    # queryset = Config.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Config.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Config.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class ConfigRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    # queryset = Config.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Config.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Config.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class ConfigRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigRemoveFileSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    # queryset = Config.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Config.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Config.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class ConfigListRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigListSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    # queryset = Config.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class ConfigDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigDeleteSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    #queryset = Config.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class ConfigUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = ConfigUpdateSerializer

    queryset = Config.objects.all().order_by("-created_at")
    
    #queryset = Config.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Config.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAppSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AllAppSerializer

    queryset = AllApp.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return AllApp.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAppFilterRestApiView(generics.ListAPIView):
    serializer_class = AllAppSerializer

    # queryset = AllApp.objects.all().order_by("-created_at")
    
    # queryset = AllApp.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllApp.objects.all().order_by("-created_at")
    
        # queryset =  AllApp.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAppFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = AllAppSerializer

    # queryset = AllApp.objects.all().order_by("created_at")
    
    # queryset = AllApp.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllApp.objects.all().order_by("created_at")
    
        # queryset =  AllApp.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAppFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = AllAppSerializer

    # queryset = AllApp.objects.all().order_by("created_at")
    
    # queryset = AllApp.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllApp.objects.all().order_by("created_at")
    
        # queryset =  AllApp.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAppRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = AllAppSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    # queryset = AllApp.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllApp.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllApp.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAppRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    # queryset = AllApp.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllApp.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllApp.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAppRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppRemoveFileSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    # queryset = AllApp.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllApp.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllApp.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAppListRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppListSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    # queryset = AllApp.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAppDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppDeleteSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    #queryset = AllApp.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAppUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAppUpdateSerializer

    queryset = AllApp.objects.all().order_by("-created_at")
    
    #queryset = AllApp.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllApp.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllViewSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AllViewSerializer

    queryset = AllView.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return AllView.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllViewFilterRestApiView(generics.ListAPIView):
    serializer_class = AllViewSerializer

    # queryset = AllView.objects.all().order_by("-created_at")
    
    # queryset = AllView.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllView.objects.all().order_by("-created_at")
    
        # queryset =  AllView.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllViewFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = AllViewSerializer

    # queryset = AllView.objects.all().order_by("created_at")
    
    # queryset = AllView.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllView.objects.all().order_by("created_at")
    
        # queryset =  AllView.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllViewFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = AllViewSerializer

    # queryset = AllView.objects.all().order_by("created_at")
    
    # queryset = AllView.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllView.objects.all().order_by("created_at")
    
        # queryset =  AllView.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllViewRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = AllViewSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    # queryset = AllView.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllView.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllView.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllViewRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    # queryset = AllView.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllView.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllView.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllViewRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewRemoveFileSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    # queryset = AllView.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllView.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllView.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllViewListRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewListSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    # queryset = AllView.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllViewDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewDeleteSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    #queryset = AllView.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllViewUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = AllViewUpdateSerializer

    queryset = AllView.objects.all().order_by("-created_at")
    
    #queryset = AllView.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllView.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AdminMenuGroupSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AdminMenuGroupSerializer

    queryset = AdminMenuGroup.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return AdminMenuGroup.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AdminMenuGroupFilterRestApiView(generics.ListAPIView):
    serializer_class = AdminMenuGroupSerializer

    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
        # queryset =  AdminMenuGroup.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AdminMenuGroupFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = AdminMenuGroupSerializer

    # queryset = AdminMenuGroup.objects.all().order_by("created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AdminMenuGroup.objects.all().order_by("created_at")
    
        # queryset =  AdminMenuGroup.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AdminMenuGroupFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = AdminMenuGroupSerializer

    # queryset = AdminMenuGroup.objects.all().order_by("created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AdminMenuGroup.objects.all().order_by("created_at")
    
        # queryset =  AdminMenuGroup.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AdminMenuGroupRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AdminMenuGroup.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AdminMenuGroup.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AdminMenuGroupRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AdminMenuGroup.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AdminMenuGroup.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AdminMenuGroupRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupRemoveFileSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AdminMenuGroup.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AdminMenuGroup.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AdminMenuGroupListRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupListSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    # queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AdminMenuGroupDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupDeleteSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    #queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AdminMenuGroupUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = AdminMenuGroupUpdateSerializer

    queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    
    #queryset = AdminMenuGroup.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AdminMenuGroup.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAdminMenuSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = AllAdminMenuSerializer

    queryset = AllAdminMenu.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name','title',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return AllAdminMenu.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAdminMenuFilterRestApiView(generics.ListAPIView):
    serializer_class = AllAdminMenuSerializer

    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
        # queryset =  AllAdminMenu.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAdminMenuFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = AllAdminMenuSerializer

    # queryset = AllAdminMenu.objects.all().order_by("created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllAdminMenu.objects.all().order_by("created_at")
    
        # queryset =  AllAdminMenu.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAdminMenuFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = AllAdminMenuSerializer

    # queryset = AllAdminMenu.objects.all().order_by("created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = AllAdminMenu.objects.all().order_by("created_at")
    
        # queryset =  AllAdminMenu.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class AllAdminMenuRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllAdminMenu.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllAdminMenu.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAdminMenuRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllAdminMenu.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllAdminMenu.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAdminMenuRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuRemoveFileSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return AllAdminMenu.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return AllAdminMenu.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class AllAdminMenuListRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuListSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    # queryset = AllAdminMenu.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAdminMenuDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuDeleteSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    #queryset = AllAdminMenu.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class AllAdminMenuUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = AllAdminMenuUpdateSerializer

    queryset = AllAdminMenu.objects.all().order_by("-created_at")
    
    #queryset = AllAdminMenu.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.AllAdminMenu.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PositionSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = PositionSerializer

    queryset = Position.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return Position.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PositionFilterRestApiView(generics.ListAPIView):
    serializer_class = PositionSerializer

    # queryset = Position.objects.all().order_by("-created_at")
    
    # queryset = Position.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Position.objects.all().order_by("-created_at")
    
        # queryset =  Position.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PositionFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = PositionSerializer

    # queryset = Position.objects.all().order_by("created_at")
    
    # queryset = Position.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Position.objects.all().order_by("created_at")
    
        # queryset =  Position.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PositionFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = PositionSerializer

    # queryset = Position.objects.all().order_by("created_at")
    
    # queryset = Position.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Position.objects.all().order_by("created_at")
    
        # queryset =  Position.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PositionRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    # queryset = Position.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Position.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Position.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PositionRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    # queryset = Position.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Position.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Position.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PositionRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionRemoveFileSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    # queryset = Position.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Position.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Position.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PositionListRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionListSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    # queryset = Position.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PositionDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionDeleteSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    #queryset = Position.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PositionUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = PositionUpdateSerializer

    queryset = Position.objects.all().order_by("-created_at")
    
    #queryset = Position.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Position.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class FooterItemSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = FooterItemSerializer

    queryset = FooterItem.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return FooterItem.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class FooterItemFilterRestApiView(generics.ListAPIView):
    serializer_class = FooterItemSerializer

    # queryset = FooterItem.objects.all().order_by("-created_at")
    
    # queryset = FooterItem.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = FooterItem.objects.all().order_by("-created_at")
    
        # queryset =  FooterItem.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class FooterItemFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = FooterItemSerializer

    # queryset = FooterItem.objects.all().order_by("created_at")
    
    # queryset = FooterItem.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = FooterItem.objects.all().order_by("created_at")
    
        # queryset =  FooterItem.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class FooterItemFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = FooterItemSerializer

    # queryset = FooterItem.objects.all().order_by("created_at")
    
    # queryset = FooterItem.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = FooterItem.objects.all().order_by("created_at")
    
        # queryset =  FooterItem.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class FooterItemRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    # queryset = FooterItem.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return FooterItem.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return FooterItem.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class FooterItemRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    # queryset = FooterItem.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return FooterItem.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return FooterItem.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class FooterItemRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemRemoveFileSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    # queryset = FooterItem.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return FooterItem.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return FooterItem.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class FooterItemListRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemListSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    # queryset = FooterItem.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class FooterItemDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemDeleteSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    #queryset = FooterItem.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class FooterItemUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = FooterItemUpdateSerializer

    queryset = FooterItem.objects.all().order_by("-created_at")
    
    #queryset = FooterItem.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.FooterItem.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class WidgetSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = WidgetSerializer

    queryset = Widget.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name','title','url','desc','html_code','css_code','js_code','order','active',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return Widget.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class WidgetFilterRestApiView(generics.ListAPIView):
    serializer_class = WidgetSerializer

    # queryset = Widget.objects.all().order_by("-created_at")
    
    # queryset = Widget.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Widget.objects.all().order_by("-created_at")
    
        # queryset =  Widget.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class WidgetFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = WidgetSerializer

    # queryset = Widget.objects.all().order_by("created_at")
    
    # queryset = Widget.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Widget.objects.all().order_by("created_at")
    
        # queryset =  Widget.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class WidgetFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = WidgetSerializer

    # queryset = Widget.objects.all().order_by("created_at")
    
    # queryset = Widget.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = Widget.objects.all().order_by("created_at")
    
        # queryset =  Widget.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class WidgetRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = WidgetSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    # queryset = Widget.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Widget.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Widget.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class WidgetRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    # queryset = Widget.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Widget.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Widget.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class WidgetRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetRemoveFileSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    # queryset = Widget.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return Widget.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return Widget.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class WidgetListRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetListSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    # queryset = Widget.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class WidgetDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetDeleteSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    #queryset = Widget.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class WidgetUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = WidgetUpdateSerializer

    queryset = Widget.objects.all().order_by("-created_at")
    
    #queryset = Widget.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.Widget.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class TimeZoneSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = TimeZoneSerializer

    queryset = TimeZone.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return TimeZone.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class TimeZoneFilterRestApiView(generics.ListAPIView):
    serializer_class = TimeZoneSerializer

    # queryset = TimeZone.objects.all().order_by("-created_at")
    
    # queryset = TimeZone.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = TimeZone.objects.all().order_by("-created_at")
    
        # queryset =  TimeZone.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class TimeZoneFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = TimeZoneSerializer

    # queryset = TimeZone.objects.all().order_by("created_at")
    
    # queryset = TimeZone.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = TimeZone.objects.all().order_by("created_at")
    
        # queryset =  TimeZone.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class TimeZoneFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = TimeZoneSerializer

    # queryset = TimeZone.objects.all().order_by("created_at")
    
    # queryset = TimeZone.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = TimeZone.objects.all().order_by("created_at")
    
        # queryset =  TimeZone.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class TimeZoneRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    # queryset = TimeZone.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return TimeZone.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return TimeZone.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class TimeZoneRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    # queryset = TimeZone.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return TimeZone.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return TimeZone.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class TimeZoneRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneRemoveFileSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    # queryset = TimeZone.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return TimeZone.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return TimeZone.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class TimeZoneListRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneListSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    # queryset = TimeZone.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class TimeZoneDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneDeleteSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    #queryset = TimeZone.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class TimeZoneUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = TimeZoneUpdateSerializer

    queryset = TimeZone.objects.all().order_by("-created_at")
    
    #queryset = TimeZone.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.TimeZone.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PageInfoSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = PageInfoSerializer

    queryset = PageInfo.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name','title','charset','header','desc','meta_description',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return PageInfo.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PageInfoFilterRestApiView(generics.ListAPIView):
    serializer_class = PageInfoSerializer

    # queryset = PageInfo.objects.all().order_by("-created_at")
    
    # queryset = PageInfo.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = PageInfo.objects.all().order_by("-created_at")
    
        # queryset =  PageInfo.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PageInfoFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = PageInfoSerializer

    # queryset = PageInfo.objects.all().order_by("created_at")
    
    # queryset = PageInfo.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = PageInfo.objects.all().order_by("created_at")
    
        # queryset =  PageInfo.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PageInfoFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = PageInfoSerializer

    # queryset = PageInfo.objects.all().order_by("created_at")
    
    # queryset = PageInfo.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = PageInfo.objects.all().order_by("created_at")
    
        # queryset =  PageInfo.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class PageInfoRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    # queryset = PageInfo.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return PageInfo.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return PageInfo.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PageInfoRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    # queryset = PageInfo.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return PageInfo.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return PageInfo.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PageInfoRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoRemoveFileSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    # queryset = PageInfo.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return PageInfo.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return PageInfo.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class PageInfoListRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoListSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    # queryset = PageInfo.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PageInfoDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoDeleteSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    #queryset = PageInfo.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class PageInfoUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = PageInfoUpdateSerializer

    queryset = PageInfo.objects.all().order_by("-created_at")
    
    #queryset = PageInfo.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.PageInfo.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class BotUASearchRestApiView(generics.ListCreateAPIView):
    serializer_class = BotUASerializer

    queryset = BotUA.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name','active',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return BotUA.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class BotUAFilterRestApiView(generics.ListAPIView):
    serializer_class = BotUASerializer

    # queryset = BotUA.objects.all().order_by("-created_at")
    
    # queryset = BotUA.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = BotUA.objects.all().order_by("-created_at")
    
        # queryset =  BotUA.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class BotUAFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = BotUASerializer

    # queryset = BotUA.objects.all().order_by("created_at")
    
    # queryset = BotUA.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = BotUA.objects.all().order_by("created_at")
    
        # queryset =  BotUA.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class BotUAFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = BotUASerializer

    # queryset = BotUA.objects.all().order_by("created_at")
    
    # queryset = BotUA.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = BotUA.objects.all().order_by("created_at")
    
        # queryset =  BotUA.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class BotUARestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = BotUASerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    # queryset = BotUA.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return BotUA.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return BotUA.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class BotUARestApiView(viewsets.ModelViewSet):
    serializer_class = BotUASerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    # queryset = BotUA.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return BotUA.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return BotUA.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class BotUARemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = BotUARemoveFileSerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    # queryset = BotUA.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return BotUA.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return BotUA.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class BotUAListRestApiView(viewsets.ModelViewSet):
    serializer_class = BotUAListSerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    # queryset = BotUA.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class BotUADeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = BotUADeleteSerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    #queryset = BotUA.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class BotUAUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = BotUAUpdateSerializer

    queryset = BotUA.objects.all().order_by("-created_at")
    
    #queryset = BotUA.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.BotUA.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class RobotsArgSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = RobotsArgSerializer

    queryset = RobotsArg.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name','value','ua','active',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return RobotsArg.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class RobotsArgFilterRestApiView(generics.ListAPIView):
    serializer_class = RobotsArgSerializer

    # queryset = RobotsArg.objects.all().order_by("-created_at")
    
    # queryset = RobotsArg.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = RobotsArg.objects.all().order_by("-created_at")
    
        # queryset =  RobotsArg.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class RobotsArgFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = RobotsArgSerializer

    # queryset = RobotsArg.objects.all().order_by("created_at")
    
    # queryset = RobotsArg.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = RobotsArg.objects.all().order_by("created_at")
    
        # queryset =  RobotsArg.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class RobotsArgFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = RobotsArgSerializer

    # queryset = RobotsArg.objects.all().order_by("created_at")
    
    # queryset = RobotsArg.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = RobotsArg.objects.all().order_by("created_at")
    
        # queryset =  RobotsArg.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class RobotsArgRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    # queryset = RobotsArg.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return RobotsArg.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return RobotsArg.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class RobotsArgRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    # queryset = RobotsArg.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return RobotsArg.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return RobotsArg.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class RobotsArgRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgRemoveFileSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    # queryset = RobotsArg.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return RobotsArg.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return RobotsArg.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class RobotsArgListRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgListSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    # queryset = RobotsArg.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class RobotsArgDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgDeleteSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    #queryset = RobotsArg.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class RobotsArgUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = RobotsArgUpdateSerializer

    queryset = RobotsArg.objects.all().order_by("-created_at")
    
    #queryset = RobotsArg.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.RobotsArg.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class LogoImagesSearchRestApiView(generics.ListCreateAPIView):
    serializer_class = LogoImagesSerializer

    queryset = LogoImages.objects.all()
    
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    search_fields = ['name',]
    # search_fields = ['name']

    filter_backends = (filters.SearchFilter,)
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     return LogoImages.objects.all().order_by("-created_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class LogoImagesFilterRestApiView(generics.ListAPIView):
    serializer_class = LogoImagesSerializer

    # queryset = LogoImages.objects.all().order_by("-created_at")
    
    # queryset = LogoImages.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = LogoImages.objects.all().order_by("-created_at")
    
        # queryset =  LogoImages.objects.all().order_by("-created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class LogoImagesFilterLargeRestApiView(generics.ListAPIView):
    serializer_class = LogoImagesSerializer

    # queryset = LogoImages.objects.all().order_by("created_at")
    
    # queryset = LogoImages.objects.all().order_by("created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = LogoImages.objects.all().order_by("created_at")
    
        # queryset =  LogoImages.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class LogoImagesFilterMediumRestApiView(generics.ListAPIView):
    serializer_class = LogoImagesSerializer

    # queryset = LogoImages.objects.all().order_by("created_at")
    
    # queryset = LogoImages.objects.all().order_by("created_at")
    pagination_class = StandardResultsSetPagination
    # lookup_field = 'uuid'
    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def get_queryset(self):

        queryset = LogoImages.objects.all().order_by("created_at")
    
        # queryset =  LogoImages.objects.all().order_by("created_at")
        query_params = self.request.query_params
        if '_' in query_params:
            query_params._mutable=True
            print(query_params['_'])
            query_params.pop('_')
            query_params._mutable=False

        if 'page' in query_params:
            query_params._mutable=True
            print(query_params['page'])
            query_params.pop('page')
            query_params._mutable=False

        if 'start_date__gte' in query_params:
            query_params._mutable=True
            print(query_params['start_date__gte'])
            start_date = str(query_params.pop('start_date__gte')[0])
            query_params._mutable=False

        if 'end_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['end_date__lte'])
            end_date = str(query_params.pop('end_date__lte')[0])
            query_params._mutable=False
            
        if 'expriry_date__lte' in query_params:
            query_params._mutable=True
            print(query_params['expriry_date__lte'])
            expriry_date = str(query_params.pop('expriry_date__lte')[0])
            query_params._mutable=False
        try:
            if 'start_date' in locals():
                if 'expriry_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(start_date__gte=start_date)

            elif 'end_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,end_date__lte=end_date)
                else:
                    queryset = queryset.filter(end_date__lte=end_date)

            elif 'expriry_date' in locals():
                if 'start_date' in locals():
                    queryset = queryset.filter(start_date__gte=start_date,expriry_date__lte=expriry_date)
                else:
                    queryset = queryset.filter(expriry_date__lte=expriry_date)
        except Exception as xx:
            print("[sFilterRestApiView] Error: %s" % str(xx))
            pass
        if len(query_params)>0:
            # return queryset.filter(**query_params.dict())
            return queryset.filter(reduce(operator.and_, 
                                    (Q(**d) for d in (dict([i]) for i in query_params.dict().items()))))
        else:
            return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

                        
class LogoImagesRestLargePaginationApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    # queryset = LogoImages.objects.all().order_by("-created_at")
    pagination_class = LargeResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return LogoImages.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return LogoImages.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class LogoImagesRestApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    # queryset = LogoImages.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return LogoImages.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return LogoImages.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class LogoImagesRemoveFileRestApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesRemoveFileSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    # queryset = LogoImages.objects.all().order_by("-created_at")
    pagination_class = SmallResultsSetPagination
    # lookup_field = 'name'
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)
    # def get_queryset(self):
    #     # user = self.request.name
    #     if 'name' in self.kwargs:
    #         return LogoImages.objects.filter(name=self.kwargs["name"]).order_by("-created_at")
    #     else:
    #         return LogoImages.objects.all().order_by("-created_at")
    # def retrieve(self, request, *args, **kwargs): # Change is here <<
    #     serializer = self.get_serializer(self.get_queryset(), many=True)
    #     return Response(data=serializer.data)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

            
class LogoImagesListRestApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesListSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    # queryset = LogoImages.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class LogoImagesDeleteRestApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesDeleteSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    #queryset = LogoImages.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            
class LogoImagesUpdateRestApiView(viewsets.ModelViewSet):
    serializer_class = LogoImagesUpdateSerializer

    queryset = LogoImages.objects.all().order_by("-created_at")
    
    #queryset = LogoImages.objects.all().order_by("-created_at")
    # pagination_class = SmallResultsSetPagination
    lookup_field = 'uuid'

    # authentication_classes = [
    #     JWTAuthentication,
    #     JSONWebTokenAuthentication,
    #     TokenAuthentication,
    #     SessionAuthentication,
    #     BasicAuthentication,
    # ]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny,]
    #
    # def get(self, request, format=None):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': str(request.auth),  # None
    #     }
    #     return Response(content)
    #
    # def put(self, request, filename, format=None):
    #     file_obj = request.FILES['file']
    #     # do some stuff with uploaded file
    #     return Response(status=204)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return models.LogoImages.objects.filter(author=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

            