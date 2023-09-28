from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import routers, serializers, viewsets
# from rest_framework.pagination import PageNumberPagination
# from .pagination import CustomPagination
from .models import *
from AssetManagement.models import *
from .serializers import *
import django_filters.rest_framework
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

class MyCustomPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'

    def get_page_number(self, request, paginator):
        page_number = request.query_params.get('page', 1)
        return super().get_page_number(request, paginator)
    
class CodeViewSet(viewsets.ModelViewSet):
    queryset = GenerateCode.objects.all()
    serializer_class = CodeSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['app_name', 'prefix']