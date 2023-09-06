from rest_framework import viewsets, filters
from django.core import serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import serializers
from django.core import serializers
from django_filters import rest_framework as filter
import django_filters.rest_framework
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters

from .models import FormManagement
from .models import ListTypeForm
from .models import ListAsset
from .models import HistoryUseAsset
from .models import TypeAction
from .serializers import FormManagementSerializer, FormManagementSimpleSerializer
from .serializers import ListTypeFormSerializer
from .serializers import HistoryUseAssetSerializer
from .serializers import ListAssetSerializer, ListAssetSimpleSerializer
from .serializers import AssetTempSerializer
from .serializers import UnitTempSerializer
from .serializers import StaffTempSerializer
from .serializers import TypeActionSerializer
from company.models import Company, Unit, Staff
from AssetManagement.models import Asset
# from .serializers import AssetSerislizer

class FormFilter(filter.FilterSet):
    # name = filters.CharFilter(lookup_expr='icontains')
    type_form = django_filters.ModelChoiceFilter(field_name="type_form__slug",
                                            queryset=ListTypeForm.objects.all())

    class Meta:
        model = FormManagement
        # fields = {
        #     'name': ['icontains'],
        #     'code': ['icontains'],
        #     'type': ['icontains']
        #     # 'created_at': ['iexact', 'lte', 'gte']
        # }

        fields = (
            'name',
            'code',
            'type_form',
        )

class FormManagementViewSet(viewsets.ModelViewSet):
    queryset = FormManagement.objects.all().order_by('-updated_at')
    serializer_class = FormManagementSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # type = django_filters.ModelChoiceFilter(field_name="type_form__slug",
    #                                         queryset=ListTypeForm.objects.all())
    # filter_fields = FormFilter
    filter_fields = {'name': ['icontains'], 'code': ['icontains'], 'type_form': ['exact']}

    ordering_fields = ['created_at']
    # filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'code']


    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    

class ListTypeFormViewSet(viewsets.ModelViewSet):
    queryset = ListTypeForm.objects.all()
    serializer_class = ListTypeFormSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'], 'code': ['icontains']}
    search_fields = ['name', 'code']

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user

            
class ListAssetViewSet(viewsets.ModelViewSet):
    queryset = ListAsset.objects.all()
    serializer_class = ListAssetSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'], 'code_form': ['exact'], 'asset': ['exact']}
    search_fields = {'name': ['icontains'], 'code': ['icontains']}
    
    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    
class ListAssetSimpleViewSet(viewsets.ModelViewSet):
    queryset = ListAsset.objects.all()
    serializer_class = ListAssetSimpleSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'code_form': ['exact'], 'asset': ['exact']}
    search_fields = {'name': ['icontains'], 'code': ['icontains']}

    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user
    
class HistoryUseAssetViewSet(viewsets.ModelViewSet):
    queryset = HistoryUseAsset.objects.all()
    serializer_class = HistoryUseAssetSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'code': ['icontains'], 'asset': ['exact'], 'user': ['exact'], 'type_action': ['exact']}
    # filter_backends = [filters.SearchFilter]
    search_fields = {'code': ['icontains']}
    
    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user

class AssetViewAllList(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetTempSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend , filters.SearchFilter]
    search_fields = {'name': ['icontains'], 'code': ['icontains']}

class FormManagementTempleViewSet(viewsets.ModelViewSet):
    queryset = FormManagement.objects.all().order_by('-updated_at')
    serializer_class = FormManagementSimpleSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'], 'code': ['icontains'], 'type_form': ['exact']}
    # ordering_fields = ['created_at']
    search_fields = {'name': ['icontains'], 'code': ['icontains']}


    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user

class TypeActionViewSet(viewsets.ModelViewSet):
    queryset = TypeAction.objects.all().order_by('-updated_at')
    serializer_class = TypeActionSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = {'name': ['icontains'], 'code': ['icontains']}
    # ordering_fields = ['created_at']
    search_fields = ['name', 'code']


    def get_queryset(self):
        query_set = self.queryset
        crr_user = self.request.user
        query_set_by_request_user = query_set.filter(created_by=crr_user)
        return query_set_by_request_user

class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitTempSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend , filters.SearchFilter]
    search_fields = {'name': ['icontains']}

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffTempSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend , filters.SearchFilter]
    search_fields = {'name': ['icontains']}